package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.lk.lms.common.dao.PushDAO;
import com.lk.lms.common.util.LmsConstants;
import com.lk.lms.common.util.LmsUtil;
import com.lk.lms.common.vo.CamelCaseMap;

@Service("pushService")
public class PushService {
	
Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    private PushDAO pushDAO;
    
    
    //발송성공
    private static final String PROC_SUCESS ="Y";
    
    //발송실패
    private static final String PROC_ERROR ="E";
    

    
    /**
     * Push 발송 리스트 조회
     * @return
     */
    public List<Map<String,String>> getPushProcList(){
        return pushDAO.selectPushProcList();
    }
    
    
    /**
     * PUSH 발송
     * @param sn
     */
    public int sendPush(int sn) {
        Map<String,String> push = pushDAO.selectPush(sn);
        return this.sendPush(push);
    }
    
    
    /**
     * PUSH 발송
     * @param push
     */
    public int sendPush(Map<String,String> push) {
        Map<String,String> procUpdateParam = new HashMap<String,String>();
        procUpdateParam.put("sn", String.valueOf(push.get("sn")));
        
        try {
            sendPushMessage(String.valueOf(push.get("sj"))
                            , String.valueOf(push.get("cn"))
                            , String.valueOf(push.get("rcverTkn")));
            
            logger.debug("push 발송완료 SN:{}, RCVER_TKN:{}, SJ:{}, CN{}", push.get("sn"),push.get("rcverTkn"),push.get("sj"),push.get("cn"));
            
            //발송성공 상태로 변경
            procUpdateParam.put("processYn", PROC_SUCESS);
            pushDAO.updatePushProcessYN(procUpdateParam);
            
            return 1;
        }catch(Exception e) {
            logger.debug("push 발송에러 SN:{}, RCVER_TKN:{}, SJ:{}, CN{}", push.get("sn"),push.get("rcverTkn"),push.get("sj"),push.get("cn"));
            
            //발송에러 상태로 변경
            procUpdateParam.put("processYn", PROC_ERROR);
            pushDAO.updatePushProcessYN(procUpdateParam);
            return 0;
        }
    }
    
    
    /**
     * Push메세지 발송(단일 수신자)
     * 
     * @param title        제목
     * @param body        내용
     * @param pushToken    푸쉬 토큰값
     * @return            호출결과 Map
     * @throws Exception 
     */
    public Map<?, ?> sendPushMessage(String title, String body, String pushToken) throws Exception {
        try {
            //android S
//            Map<String, Object> params = new HashMap<String, Object>();
//            Map<String, String> mNoti = new HashMap<String, String>();
//            mNoti.put("title", title);
//            mNoti.put("content", body);
//            mNoti.put("click_action", "FCM_PLUGIN_ACTIVITY");
//            
//            params.put("data", mNoti);
//            params.put("to", pushToken);
//            //android E
//            
//            

            //ios
//            Map<String, Object> params = new HashMap<String, Object>();
//            Map<String, String> mNoti = new HashMap<String, String>();
//            mNoti.put("title", title);
//            mNoti.put("body", body);
//            params.put("notification", mNoti);
//            params.put("to", pushToken);
//            params.put("priority", "high");
            //ios
            
            
            
            Map<String, Object> params = new HashMap<String, Object>();
            Map<String, String> mNoti = new HashMap<String, String>();
            mNoti.put("title", title);
            mNoti.put("body", body);
            mNoti.put("click_action", "FCM_PLUGIN_ACTIVITY");
            
            Map<String, String> mData = new HashMap<String, String>();
            mData.put("title", title);
            mData.put("body", body);
            
            params.put("to", pushToken);
            params.put("notification", mNoti);
            params.put("data", mData);
            
            
            
            
            
//            Map<String, String> mData = new HashMap<String, String>();
//            mData.put("title", title);
//            mData.put("body", body);
//            params.put("data", mData);
            
            RestTemplate restTemplate = new RestTemplate();
            
            // Request body
            String jsonStr = LmsUtil.objToJsonStr(params);
            logger.debug("jsonStr:{}", jsonStr);
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://fcm.googleapis.com/fcm/send");

            // Request header
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");
            headers.add(HttpHeaders.AUTHORIZATION, "key=".concat(LmsConstants.PUSH_API_KEY));

            HttpEntity<?> request = new HttpEntity<>(jsonStr, headers);
            ResponseEntity<String> response = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST, request, String.class);
            
            int responseCode = response.getStatusCode().value();
            String result = response.getBody();
            
            logger.debug("responseCode : {}", responseCode);
            logger.debug("result : {}", result);
            
            if(responseCode == HttpServletResponse.SC_OK) {
                ObjectMapper mapper = new ObjectMapper();
                Map<?, ?> mResult = mapper.readValue(result, Map.class);
                
                logger.debug("map:{}", mResult);
                logger.debug("success:{}", mResult.get("success"));
                
                return mResult;
            }
        } catch (Exception e) {
            logger.error("Send Error : {}", e);
            throw e;
        }
        return null;
    }

}
