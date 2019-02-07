package com.lk.lms.common.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;

import javax.management.MBeanServerConnection;
import javax.management.ObjectName;
import javax.management.ReflectionException;

import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.jmx.support.MBeanServerConnectionFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.util.ClassUtils;
import org.springframework.util.PropertyPlaceholderHelper;


@Service("activeServersMBeanInvoker")
public class ActiveServersMBeanInvoker implements BeanClassLoaderAware {
	
	private Logger logger = LoggerFactory.getLogger(ActiveServersMBeanInvoker.class);
    private final static PropertyPlaceholderHelper propertyPlaceholderHelper = new PropertyPlaceholderHelper("${", "}");
    private final Map<String, MBeanServerConnectionFactoryBean> mBeanServerConnectionFactoryBeans = new ConcurrentHashMap<String, MBeanServerConnectionFactoryBean>();
    private final Map<String, MBeanServerConnection> jmxConnectors = new ConcurrentHashMap<String, MBeanServerConnection>();
    
    private Map<String, Properties> serverInfos = new HashMap<String, Properties>();
    private String jmxServiceUrlPattern = "service:jmx:rmi://${serverIpAddress}/jndi/rmi://${serverIpAddress}:${jmxPort}/sprout";
    private String objectName = "connector:name=rmi";
    private Map<String, Object> environment = new HashMap<String, Object>();
    private boolean ignoreException = true;
    private ClassLoader beanClassLoader = ClassUtils.getDefaultClassLoader();
    
    
    /**
     * invokeAll
     * 모든 JMX 서버에 Invoke를 실행한다
     * @param name
     * @param operationName
     * @param params
     * @param signature
     * @return
     * @throws Exception Map<String,Object>
     */
    public Map<String, Object> invokeAll(ObjectName name, String operationName, Object params[], String signature[]) throws Exception {
        Iterator<String> keys = jmxConnectors.keySet().iterator();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        String key = null;
        while (keys.hasNext()) {
            key = keys.next();
            MBeanServerConnection sc = jmxConnectors.get(key);
            try {
                Object returnObject = sc.invoke(name, operationName, params, signature);
                resultMap.put(key, returnObject);
            } catch (ReflectionException e) {
                logger.warn("mBeanServer ReflectionException : {}", key);
                logger.info(e.getLocalizedMessage());
                logger.debug(ExceptionUtils.getStackTrace(e));
                jmxConnectors.remove(key);
                if (ignoreException) {            
                    resultMap.put(key, e.getMessage());
                }else{
                    throw e;
                }
            } catch (Exception e) {
                try {
                    reconnect(name, operationName, params, signature, resultMap, key, e);
                } catch (Exception e1) {
                    logger.warn("mBeanServer Connection fail : {}", key);
                    logger.info(e1.getLocalizedMessage());
                    logger.debug(ExceptionUtils.getStackTrace(e1));
                    if (ignoreException) {
                        resultMap.put(key, e.getMessage());
                    }else{
                        throw e1;
                    }
                }
            }
        }
        return resultMap;
    }
    
    
    /**
     * invoke
     * 선택된 JMX 서버에 Invoke를 준다  
     * @param sc
     * @param name
     * @param operationName
     * @param params
     * @param signature
     * @return
     * @throws IOException Object
     */
    public Object invoke(MBeanServerConnection sc, ObjectName name, String operationName, Object params[], String signature[]) throws IOException {
        Object returnObject = new Object();
        
        try {
            returnObject = sc.invoke(name, operationName, params, signature);
        } catch (ReflectionException e) {
            logger.warn("mBeanServer ReflectionException : {}", sc.getDefaultDomain());
            logger.info(e.getLocalizedMessage());
            logger.debug(ExceptionUtils.getStackTrace(e));
            returnObject = e;
        } catch (Exception e) {
            logger.warn("mBeanServer Connection fail : {}", sc.getDefaultDomain());
            logger.info(e.getLocalizedMessage());
            logger.debug(ExceptionUtils.getStackTrace(e));
            returnObject = e;
        }
        return returnObject;
    }

    
    /**
     * createConnection
     * JMX 서버에 연결할 커넥터를 생성한다  
     * @param key
     * @param serverInfo
     * @return
     * @throws IOException MBeanServerConnection
     */
    public MBeanServerConnection createConnection(String key, Properties serverInfo) throws IOException {
        String serviceUrl = propertyPlaceholderHelper.replacePlaceholders(jmxServiceUrlPattern, serverInfo);
        MBeanServerConnectionFactoryBean connectorServerFactoryBean = new MBeanServerConnectionFactoryBean();
        connectorServerFactoryBean.setEnvironmentMap(environment);
        connectorServerFactoryBean.setServiceUrl(serviceUrl);
        connectorServerFactoryBean.setConnectOnStartup(false);
        connectorServerFactoryBean.setBeanClassLoader(beanClassLoader);
        connectorServerFactoryBean.afterPropertiesSet();
        mBeanServerConnectionFactoryBeans.put(key, connectorServerFactoryBean);
        return connectorServerFactoryBean.getObject();
    }
    
    
    /**
     * reconnect
     * MBean 서버에 다시 연결한다
     * @param name
     * @param operationName
     * @param params
     * @param signature
     * @param resultMap
     * @param key
     * @param e
     * @throws Exception void
     */
    private void reconnect(ObjectName name, String operationName, Object[] params, String[] signature,
                           Map<String, Object> resultMap, String key, Exception e) throws Exception {
       MBeanServerConnection sc2 = createConnection(key, serverInfos.get(key));;
       Object returnObject = sc2.invoke(name, operationName, params, signature);
       if (returnObject != null) {
           resultMap.put(key, returnObject);
           try {
               mBeanServerConnectionFactoryBeans.get(key).destroy();
           } catch (IOException e1) {
           }
           mBeanServerConnectionFactoryBeans.remove(key);
           jmxConnectors.put(key, sc2);
       }
   }
    
    @Override
    public void setBeanClassLoader(ClassLoader classLoader) {
        this.beanClassLoader = classLoader;
    }
    public Map<String, Properties> getServerInfos() {
        return serverInfos;
    }
    public void setServerInfos(Map<String, Properties> serverInfos) {
        this.serverInfos = serverInfos;
    }
    public String getObjectName() {
        return objectName;
    }
    public void setObjectName(String objectName) {
        this.objectName = objectName;
    }
    public Map<String, Object> getEnvironment() {
        return environment;
    }
    public void setEnvironment(Map<String, Object> environment) {
        this.environment = environment;
    }
    public boolean isIgnoreException() {
        return ignoreException;
    }
    public void setIgnoreException(boolean ignoreException) {
        this.ignoreException = ignoreException;
    }
    public ClassLoader getBeanClassLoader() {
        return beanClassLoader;
    }

}
