package com.lk.lms.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.xml.ws.BindingProvider;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component("lmsUtil")
public class LmsUtil {
	
public static Logger logger = LoggerFactory.getLogger(LmsUtil.class);
    
    static public String generateUUID() {
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");        
        Date date = new Date();
        String yyyyMMddHHmmSS = dateFormat.format(date);
        return String.format("%s_%s", yyyyMMddHHmmSS, UUID.randomUUID());
    }

    static public String objToJsonStr(Object obj) {
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = "";
        
        if (obj == null) return jsonStr;
        
        try {
            jsonStr = mapper.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return jsonStr;
    }
    
    static public Map<String, Object> objToMap(Object obj) {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        map = mapper.convertValue(obj, new TypeReference<Map<String, Object>>() {});

        return map;
    }
    
    /**
     * Back Office 서비스 포워딩
     * @param forwardURI
     * @param params
     * @return
     */
    public String forwardBO(String forwardURI, Map<String, String> params) {
        RestTemplate restTemplate = new RestTemplate();

        String uri = String.format("%s%s", LmsConstants.BO_SERVER_URL_REAL, forwardURI);
        String jsonStr = LmsUtil.objToJsonStr(params);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(uri);

        // header
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");

        HttpEntity<?> request = new HttpEntity<>(jsonStr, headers);

        String rv = "";
        try {
            ResponseEntity<String> response = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST, request, String.class);
            rv = response.getBody();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return rv;
    }
    
    /**
     * 컴마로 구분된 문자열에서 빈 값들을 제거하고 리턴한다.
     * 편집전: ,12345,12345,12345,,,12345,,
     * 편집후: 12345,12345,12345,12345
     * 
     * @param str
     * @return
     */
    public static String checkCommaStr(String str) {
        String result = "";
        
        if (str == null || str.trim().isEmpty()) return result;
        
        String[] arr = str.split(",");
        
        for (String a : arr) {
            if (a == null || a.trim().isEmpty()) continue;
            result += "," + a.trim();
        }
        
        // 맨앞의 컴마는 제거해준다.
        if (result.trim().length() > 0 && result.trim().startsWith(",")) {
            result = result.substring(1);
        }
        return result;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 아래부터는 FO/BO 다른 내역 

    /**
     * ERP 접속 서버별 웹서비스 인증과 endpoint URL 정리 
     * @param port
     */
    static public void wsAuth(Object port) {
        BindingProvider bp = (BindingProvider)port;
        
        // endpoint URL change
        // endpointAddress : http://gderp-pidap.skgas.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=GSA13_D&receiverParty=&receiverService=&interface=SD029_SO&interfaceNamespace=http%3A%2F%2Fskgas.co.kr%2FSD029
        // http://172.30.60.33:50000
        String endpointAddress =  (String) bp.getRequestContext().get(BindingProvider.ENDPOINT_ADDRESS_PROPERTY);
        LmsUtil.logger.debug("wsdl endpointAddress : " + endpointAddress);
        int xiIdx = StringUtils.indexOfIgnoreCase(endpointAddress, "/XISOAPAdapter");
        endpointAddress = LmsConstants.ERP_WS_URL + StringUtils.substring(endpointAddress, xiIdx);
        endpointAddress = StringUtils.replace(endpointAddress, "senderService=GSA13_D", "senderService="+LmsConstants.ERP_WS_SENDER_SERVICE);
        LmsUtil.logger.debug("prop endpointAddress : " + endpointAddress);
        
        bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpointAddress);

        /* Optional  credentials */
        bp.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, LmsConstants.ERP_WS_USERNAME);
        bp.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, LmsConstants.ERP_WS_PASSWORD);

    }
    
    /**
     * eCard/eTax 접속 서버별 웹서비스 인증과 endpoint URL 정리 
     * @param port
     */
    static public void wsAuth2(Object port) {
        BindingProvider bp = (BindingProvider)port;
        
        // endpoint URL change
        // endpointAddress : http://168.154.244.11:50000/services/SAS_EC001_ServiceSOAP
        // http://168.154.244.11:50000
        String endpointAddress =  (String) bp.getRequestContext().get(BindingProvider.ENDPOINT_ADDRESS_PROPERTY);
        LmsUtil.logger.debug("wsdl endpointAddress : " + endpointAddress);
        int xiIdx = StringUtils.indexOfIgnoreCase(endpointAddress, "/services");
        endpointAddress = LmsConstants.ECARD_WS_URL + StringUtils.substring(endpointAddress, xiIdx);
        LmsUtil.logger.debug("prop endpointAddress : " + endpointAddress);
        
        bp.getRequestContext().put(BindingProvider.ENDPOINT_ADDRESS_PROPERTY, endpointAddress);

//        /* Optional  credentials */
//        bp.getRequestContext().put(BindingProvider.USERNAME_PROPERTY, SasConstants.ERP_WS_USERNAME);
//        bp.getRequestContext().put(BindingProvider.PASSWORD_PROPERTY, SasConstants.ERP_WS_PASSWORD);

    }


}
