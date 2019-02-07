package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lk.lms.common.util.EmailUtil;
import com.lk.lms.common.util.LmsUtil;
import com.lk.lms.common.dao.CommonDAO;
import com.lk.lms.common.service.PushService;



@Service("commonService")
public class CommonService {
	@Autowired
    private CommonDAO commonDAO;
	
	@Autowired
    private PushService pushService;
    

    @Value("${runtime.mode}")
    private String runtimeMode;

    @Value("${email.smtp.server}")
    private String mailhost;

    @Value("${email.from.email}")
    private String fromDefaultEmail;

    @Value("${email.from.name}")
    private String fromDefaultName;
    
    @Value("${sms.from.number}")
    private String fromDefaultSms;
    

    /**
     * 공통코드 조회
     * @param map
     * @return
     */
    public List<Map<?,?>> selectCommonCodeList(Map<?, ?> map) {
        return commonDAO.selectCommonCodeList(map);
    }
    public Map<?,?> selectCommonCode(Map<?, ?> map) {
        List<Map<?,?>> codeList = this.selectCommonCodeList(map);
        return codeList.get(0);
    }
    
    /**
     * 메세지 리스트 조회
     * @param map
     * @return
     */
    public List<Map<?,?>> selectMessageList(Map<?, ?> map) {
        return commonDAO.selectMessageList(map);
    } 

    public List<Map<?, ?>> getPrductList() {
        return commonDAO.selectPrductList();
    } 
    
    /**
     * e-mail 발송
     * @param to 수신자 이메일 ; 로 구분
     * @param cc 참조자 이메일 ; 로 구분
     * @param fromEmail 발신자 이메일, default email.from.email
     * @param fromName 발신자 명칭, default email.from.name
     * @param subject 제목
     * @param content 내역 HTML
     * @param atchGroupSn 첨부그룹순번
     * @param atchSn 첨부순번 배열
     * @return
     */
    @Transactional
    public boolean sendEmail(String to, String cc, String fromEmail, String fromName, String subject,
            String content, String sndngGbn, String atchGroupSn) throws Exception {

        // 발신자 디폴트
        if (StringUtils.isEmpty(fromEmail)) {
            fromEmail = fromDefaultEmail;
        }
        
        // 발신자 디폴트
        if (StringUtils.isEmpty(fromName)) {
            fromName = fromDefaultName;
        }
        
        // 메시지 구분 디폴트
        if (StringUtils.isEmpty(sndngGbn)) {
            sndngGbn = "01";  // 공지
        }

        // TODO 첨부그룹순번에 따른 첨부파일 정리
        if (StringUtils.isNotEmpty(atchGroupSn)) {
            
        }

        if (StringUtils.isNotEmpty(to) && !StringUtils.endsWith(to, ";")) to += ";";
        if (StringUtils.isNotEmpty(cc) && !StringUtils.endsWith(cc, ";")) cc += ";";
        try {
            // 이메일 발송
            EmailUtil.htmlsend(to, cc, fromEmail, fromName, subject, mailhost, content, null);
            
            // 히스토리 저장
            Map<String, Object> map = new HashMap<>();
            map.put("sender", fromEmail);
            map.put("rcver", to);
            map.put("cc", cc);
            map.put("sj", subject);
            map.put("cn", content);
            map.put("atchGroupSn", 12345689); //for test
            map.put("sndngGbn", sndngGbn);
            
            commonDAO.insertEmailHist(map);
        } catch (Exception e) {
            throw e;
        }
        
        return true;
    }
    
    /**
     * SMS 발송
     * @param arrRcvPhnIds 수신자 목록
     * @param sndPhnId 발신자 번호, default sms.from.number
     * @param sndMsg 발신 내용
     * @param loginId 로그인 아이디
     * @return
     */
    @Transactional
    public boolean sendSms(String[] arrRcvPhnIds, String sndPhnId, String sndMsg, String loginId ) throws Exception {        
        
        String UUID = LmsUtil.generateUUID();
        String smsGb = "00";  /* 메시지 구분  SMS : "00", LMS : "10" */
        int contentsCnt = 0;  /* 첨부된 컨텐츠 개수  SMS : 0, LMS : 1 */  
        String mimeType= "";  /* 첨부된 컨텐츠 type  SMS : '', LMS : text/plain" */
        // C:\sas\DBAgent\install\conf\DBAgent.conf : AGENT_ID
        String usrId = "skgas_test2";
        
        if ("prod".equalsIgnoreCase(runtimeMode)) {
            usrId = "skgas_test3";
        }
        
        int msgBytes = sndMsg.getBytes().length;
        if (msgBytes > 80) { // 140byte까지 SMS전송 가능
            smsGb = "10";
            contentsCnt = 1;
            mimeType = "text/plain";
        }
        
        // 발신자 디폴트
        if (StringUtils.isEmpty(sndPhnId)) {
            sndPhnId = fromDefaultSms;
        }

        try {
            for (int i = 0; i < arrRcvPhnIds.length; i++) {
                
                String arrRcvPhnId = StringUtils.replaceEach(arrRcvPhnIds[i], new String[] { "-", " " }, new String[] { "", "" });
                Map<Object, Object> map = new HashMap<>();;
                map.put("loginId", loginId);
                map.put("usrId", usrId);
                map.put("sysGbn", "FO");  //코드로 넣을지??
                map.put("uuid", UUID);  
                map.put("smsGb", smsGb);
                map.put("contentsCnt", contentsCnt);
                map.put("mimeType", mimeType);
                map.put("recptnNo", arrRcvPhnId);
                map.put("sndPhnId", sndPhnId);
                map.put("sndMsg", sndMsg);
                
                commonDAO.insertSms(map);
            }
            
        } catch (Exception e) {
            throw e;
        }
        
        return true;
    }
    
    /**
     * PUSH 발송EMK
     * @param senderId            발송자 ID
     * @param subject             제목
     * @param content            내용

     * 아래 3개중 하나는 필수 값이 
     * 없을경우 "" 으로 호출
     * @param vhcleNo            차량번호
     * @param trnspFoCd            수송사코드
     * @param cusCd                고객코드
     * 
     * @return
     * @throws Exception
     */
    @Transactional
    public void pushSend(String senderId, String subject, String content, String vhcleNo, String trnspFoCd, String cusCd ) throws Exception {        

        try {
                
            Map<String,String> map = new HashMap<>();;
            map.put("senderId", senderId);
            
            map.put("sj", subject);
            map.put("cn", content);  
            map.put("vhcleNo", vhcleNo);
            map.put("trnspFoCd", trnspFoCd);
            map.put("cusCd", cusCd);
            
            pushService.sendPush(map);
            
        } catch (Exception e) {
            throw e;
        }
        
    }
}
