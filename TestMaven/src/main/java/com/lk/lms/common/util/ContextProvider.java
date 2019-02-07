package com.lk.lms.common.util;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ContextProvider implements ApplicationContextAware {
	
	private static ApplicationContext CONTEXT;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        CONTEXT = applicationContext;
    }

    public static ApplicationContext getApplicationContext() {
        return CONTEXT;
    }
    /**
     * Get a Spring bean by type.
     **/
    public static <T> T getBean(Class<T> beanClass) throws BeansException {
        return CONTEXT.getBean(beanClass);
    }

    /**
     * Get a Spring bean by name.
     **/
    public static Object getBean(String beanName) throws BeansException {
        return CONTEXT.getBean(beanName);
    }

}
