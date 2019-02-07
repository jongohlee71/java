package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.lk.lms.common.dao.IfLogDAO;
import com.lk.lms.common.util.LmsUtil;

@Service("ifLogService")
public class IfLogService {
	
	//private Logger logger = LoggerFactory.getLogger(this.getClass());
    
//  @Value("${file.upload.path.root}")
//  private String uploadPathRoot;
//  
//  @Value("${file.extension.attach.list}")
//  private String apprExtStr;
  
  @Autowired
  private IfLogDAO ifLogDAO;
  
  public String generateUUID() {
      return LmsUtil.generateUUID();
      /*
      DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");        
      Date date = new Date();
      String yyyyMMddHHmmSS = dateFormat.format(date);
      return String.format("%s_%s", yyyyMMddHHmmSS, UUID.randomUUID());
      */
  }

  /**
   * 수신내역 로그 입력
   * @param ifId
   * @param uuid
   * @param trsmrcvGbn
   * @param recptnDtls
   * @param rtnCd
   * @param rtnMsg
   * @return
   */
  @Transactional(propagation=Propagation.REQUIRES_NEW) 
  public int insertLog(String ifId, String uuid, String trsmrcvGbn, String recptnDtls, String rtnCd, String rtnMsg) {
      Map<String, Object> map = new HashMap<>();
      map.put("ifId", ifId);        
      map.put("uuid", uuid);
      map.put("trsmrcvGbn", trsmrcvGbn);
      map.put("recptnDtls", recptnDtls);        
      map.put("resultCd", rtnCd);        
      map.put("errorDtls", rtnMsg);        
      
      return ifLogDAO.insertIfLog(map);
  }

  /**
   * 송신내역과 결과코드로 로그 수정
   * @param ifId
   * @param uuid
   * @param trnsmitDtls
   * @param rntCd
   * @param message
   * @return
   */
  @Transactional(propagation=Propagation.REQUIRES_NEW) 
  public int updateLog(String ifId, String uuid, String trnsmitDtls, String rntCd, String message) {
      Map<String, Object> map = new HashMap<>();
      map.put("ifId", ifId);        
      map.put("uuid", uuid);
      map.put("trnsmitDtls", trnsmitDtls);
      map.put("resultCd", rntCd);        
      map.put("errorDtls", message);        
      
      return ifLogDAO.updateIfLog(map);
  }

  /**
   * 에러 발생시 로그 입력/수정
   * @param ifId
   * @param uuid
   * @param trsmrcvGbn
   * @param trnsmitDtls
   * @param rtnCd
   * @param rtnMsg
   * @return
   */
  @Transactional(propagation=Propagation.REQUIRES_NEW) 
  public int exceptionIfLog(String ifId, String uuid, String trsmrcvGbn, String trnsmitDtls, String rtnCd, String rtnMsg) {
      Map<String, Object> map = new HashMap<>();
      map.put("ifId", ifId);        
      map.put("uuid", uuid);
      map.put("trsmrcvGbn", trsmrcvGbn);
      map.put("trnsmitDtls", trnsmitDtls);
      map.put("resultCd", rtnCd);
      map.put("errorDtls", rtnMsg);        
      
      return ifLogDAO.exceptionIfLog(map);
  }


}
