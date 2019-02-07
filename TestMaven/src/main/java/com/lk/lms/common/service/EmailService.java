package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.lk.lms.common.util.LmsConstants;
import com.lk.lms.common.util.LmsUtil;

@Service("emailService")
public class EmailService {

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	@Value("${runtime.mode}")
	private String runtimeMode;

	@Autowired
	private CommonService commonService;

	// 업무별 메일 발송
	@SuppressWarnings("unchecked")
	public void taskSendMail(Map<String, Object> map) {

		String forwardURI = "/test.do";
		String to = ""; // 수신자
		String cc = ""; // 참조자
		String sb = ""; // 제목
		String ct = ""; // 메일내용(HTML)
		String gb = (String) map.get("mGubun"); // 업무구분

		// email 기본정보
		Map<String, Object> info = new HashMap<>();
		info = (Map<String, Object>) map.get("mailInfo");

		// 업무구분에 따른 제목 및 내용 생성
		switch (gb) {
		// 충전소 CI지원요청 요청처리
		case "supsci620request":
			map.put("jobGbn", "SCI010");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소 CI지원요청 승인처리
		case "supsci630confm":
			map.put("jobGbn", "SCI020");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소 CI지원요청 반려처리
		case "supsci630return":
			map.put("jobGbn", "SCI030");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 발주요청
		case "supsci640order":
			map.put("jobGbn", "SCI040");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 발주접수
		case "supsci650rcept":
			map.put("jobGbn", "SCI050");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 발주취소
		case "supsci640ordcnl":
			map.put("jobGbn", "SCI060");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 검수요청
		case "supsci650acpreq":
			map.put("jobGbn", "SCI070");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 검수승인
		case "supsci660acpcfm":
			map.put("jobGbn", "SCI080");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 충전소CI 검수반려
		case "supsci660acprtn":
			map.put("jobGbn", "SCI090");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선 발주요청
		case "suposc130order":
			map.put("jobGbn", "OSC010");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선 발주접수
		case "suposc130rcept":
			map.put("jobGbn", "OSC020");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선 발주취소
		case "suposc130ordcnl":
			map.put("jobGbn", "OSC030");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선 검수요청
		case "suposc130acpreq":
			map.put("jobGbn", "OSC040");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선 검수승인
		case "suposc130acpcfm":
			map.put("jobGbn", "OSC050");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		// 외주수선비 검수반려
		case "suposc130acprtn":
			map.put("jobGbn", "OSC060");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "capsbp001request":// S/B자산 유치요청
			map.put("jobGbn", "MS0041");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "capsbp013receipt":// GPS좌표변경 조치내역 등록처리
			map.put("jobGbn", "MS0052");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm058request":// 안전점검 비정기 점검요청
			map.put("jobGbn", "MS0036");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm053request":// 특정설비 재검사요청
			map.put("jobGbn", "MS0037");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm013request": // 안전점검 승인 요청
			map.put("jobGbn", "MS0024");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm020confirm": // 안전점검 승인 처리
			map.put("jobGbn", "MS0025");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm033request":// 안전,긴급,현장점검,재검사 기성승인요청
			map.put("jobGbn", "MS0038");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm033acpreq":// 안전,긴급,현장점검,재검사 기성승인요청 승인처리
			map.put("jobGbn", "MS0039");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		case "sftsfm033ordcnl":// 안전,긴급,현장점검,재검사 기성승인요청 반려처리
			map.put("jobGbn", "MS0040");
			// 수신자 조회
			to = (String) info.get("rcvofc");
			// 참조자 조회
			cc = "";
			// 제목
			sb = (String) info.get("mailSj");
			break;
		default:
			break;
		}

		// html 조회
		forwardURI = "/getEmailCn.do";
		// 운영모드가 아니면 테스트용 이메일 설정
//        if(! "prod".equals(runtimeMode)) {
//            //to       = "jky.g@partner.sk.com;csy.g@partner.sk.com;sungkeun.g@partner.sk.com;sangsang1@partner.sk.com;";
//            to       = "jky.g@partner.sk.com;";
//        }

		// forward 를 이용하여 페이지 스트림 HTML을 받아온다.
		forwardURI = "/email" + forwardURI;

		try {
			RestTemplate restTemplate = new RestTemplate();
			String uri = String.format("%s%s", LmsConstants.FO_SERVER_URL, forwardURI);

			// request body
			String jsonStr = LmsUtil.objToJsonStr(map);
			UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(uri);
			// request header
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8");

			HttpEntity<?> request = new HttpEntity<>(jsonStr, headers);
			ResponseEntity<String> response = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST,
					request, String.class);

			ct = response.getBody(); // 본문 내용
		} catch (Exception e) {
			logger.error("[ 메일본문 생성 실패 ]" + forwardURI);
		}

		try {
			// 수신자가 null 인경우
			if (to != null) {
				// 메일 발송 및 hist 저장(공통)
				commonService.sendEmail(to, cc, null, null, sb, ct, null, null);
			}
		} catch (Exception e) {
			logger.error("[ 메일발송 실패 ]");
		}
	}

}
