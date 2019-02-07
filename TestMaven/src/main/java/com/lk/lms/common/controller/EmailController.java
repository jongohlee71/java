package com.lk.lms.common.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.lk.lms.common.util.LmsConstants;

/**
 * 이메일 본문 내용
 * 
 * @author
 *
 */
@Controller
@RequestMapping("/email")
public class EmailController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

//  @Autowired
//  private SupSci620Service supSci620Service;    
//
//  @Autowired
//  private SupSci630Service supSci630Service;    
//
//  @Autowired
//  private SupSci640Service supSci640Service;    
//
	/**
	 *
	 * 
	 * @param map
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/getEmailCn")
	public ModelAndView getEmailCn(@RequestBody Map<String, Object> map, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		logger.debug("[이메일 내용 HTML START]");
		// 유효한 접속인지 검사
		checkAuth(request, response);

		// jobGbn => 공통코드(S022:수신업무구분코드)
		String jobGbn = (String) map.get("jobGbn");
		String loadJsp = "";
		switch (jobGbn) {
		case "SCI010": 
			loadJsp = "supsci620request";
			break;
		case "SCI020": 
			loadJsp = "supsci630confm";
			break;
		case "SCI030": 
			loadJsp = "supsci630return";
			break;
		
		default:
			break;
		}

		// POSTMAN HTML 생성 테스트 Start #################################################
		Map<String, Object> srchMap = new HashMap<>();
		Map<String, Object> rtnMap = null;
		List<Map<String, Object>> dtlList = null;
		switch (jobGbn) {
//          case "SCI010":    
//              srchMap = new HashMap<>();
//              srchMap.put("ciSportRequstNo", map.get("ciSportRequstNo"));
//              rtnMap = supSci620Service.getEmail001(srchMap);
//              map.put("mailInfo", rtnMap);
//              break;
		case "MS0041": 
			break;
		default:
			break;
		}
		// POSTMAN HTML 생성 테스트 End #################################################

		ModelAndView mav = new ModelAndView("n/email/" + loadJsp);
		mav.addAllObjects(map);
		logger.debug("[이메일 내용 HTML END]");

		return mav;
	}

	private void checkAuth(HttpServletRequest request, HttpServletResponse response) {
		// TODO 요청아이피 분석하여 처리
		request.getRemoteAddr();
		logger.debug("SasConstants.RUNTIME_MODE:{}", LmsConstants.RUNTIME_MODE);
		logger.debug("SasConstants.BO_SERVER_URL:{}", LmsConstants.BO_SERVER_URL);
		logger.debug("SasConstants.BO_SERVER_URL_REAL:{}", LmsConstants.BO_SERVER_URL_REAL);
		logger.debug("request.getRemoteAddr():{}", request.getRemoteAddr());
	}

}
