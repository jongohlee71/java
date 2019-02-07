package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.lk.lms.common.util.LmsConstants;
import com.lk.lms.common.util.LmsUtil;

/**
 * 모바일 Push Service
 * 
 * @author Pak.jb
 */
@Service
public class HttpPushService {

//  /** Push메세지 발송단위 (최대 1000건) */
//  private static final int FETCH_SIZE = 100;

	Logger logger = LoggerFactory.getLogger(this.getClass());

	public static void main(String[] args) {
		HttpPushService service = new HttpPushService();
		service.sendPushMessage("푸시테스트zzzzzzz", "푸시테스트입니다.222222",
				"ejdVrN9wU08:APA91bFsPG4QiLrKOCItkthPBJ9NL474PuRFCIOa8RiHIr7TR7wVNH0X2eo0SYHFYFPs1J6on42TY8QT2layvhZz_Eu3LEvUYpm8lQmZVG7TAdVPPQNjedJ0ITm_P1vmC98DfA0x7MBS");
		service.sendPushMessage("푸시테스트zzzzzzz", "푸시테스트입니다.222",
				"c_0_ITX2MOE:APA91bEO8FTMJUoc7b54H1-BZLcxip2qK_l7KhdfcytBNruo1hMzn-Mh28leHAm7sO-4GDzbxWGhARab9EUVUu8o2tK6VYKJL3WDftyIGRqjmr2UXT0MfnlWDSOaBSjcrPXsGvhK_LYH");

	}

	/**
	 * Push메세지 발송(동일내용의 복수 수신자)
	 * 
	 * @param title         제목
	 * @param body          내용
	 * @param pushTokenList 푸쉬 토큰값 리스트
	 * @return 성공 건수
	 */
	public int sendPushMessages(String title, String body, List<String> pushTokenList) {
		int successCnt = 0;
		Map<?, ?> mapRes = null;
		if (pushTokenList != null && !pushTokenList.isEmpty()) {
			for (String pushToken : pushTokenList) {
				if (StringUtils.hasLength(pushToken)) {
					mapRes = sendPushMessage(title, body, pushToken);
					if (mapRes != null) {
						successCnt += NumberUtils.toInt(Objects.toString(mapRes.get("success"), ""));
					}
				}
			}
		}

		return successCnt;
	}

	/**
	 * Push메세지 발송(단일 수신자)
	 * 
	 * @param title     제목
	 * @param body      내용
	 * @param pushToken 푸쉬 토큰값
	 * @return 호출결과 Map
	 */
	public Map<?, ?> sendPushMessage(String title, String body, String pushToken) {
		try {
			// android S
//          Map<String, Object> params = new HashMap<String, Object>();
//          Map<String, String> mNoti = new HashMap<String, String>();
//          mNoti.put("title", title);
//          mNoti.put("content", body);
//          mNoti.put("click_action", "FCM_PLUGIN_ACTIVITY");
//          
//          params.put("data", mNoti);
//          params.put("to", pushToken);
//          //android E
//          
//          

			// ios
//          Map<String, Object> params = new HashMap<String, Object>();
//          Map<String, String> mNoti = new HashMap<String, String>();
//          mNoti.put("title", title);
//          mNoti.put("body", body);
//          params.put("notification", mNoti);
//          params.put("to", pushToken);
//          params.put("priority", "high");
			// ios

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

//          Map<String, String> mData = new HashMap<String, String>();
//          mData.put("title", title);
//          mData.put("body", body);
//          params.put("data", mData);

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
			ResponseEntity<String> response = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.POST,
					request, String.class);

			int responseCode = response.getStatusCode().value();
			String result = response.getBody();

			logger.debug("responseCode : {}", responseCode);
			logger.debug("result : {}", result);

			if (responseCode == HttpServletResponse.SC_OK) {
				ObjectMapper mapper = new ObjectMapper();
				Map<?, ?> mResult = mapper.readValue(result, Map.class);

				logger.debug("map:{}", mResult);
				logger.debug("success:{}", mResult.get("success"));

				return mResult;
			}
		} catch (Exception e) {
			logger.error("Send Error : {}", e);
		}
		return null;
	}

//  /**
//   * Push메세지 발송(멀티 수신자)
//   * @param title
//   * @param content
//   * @param regIdList
//   */
//  public void sendPushMulti(String title, String content, List<String> regIdList) {
//      int totCnt = regIdList.size();
//      if(totCnt > FETCH_SIZE) {
//          for(int i=0 ; i * FETCH_SIZE < totCnt; i++) {
//              sendPushMessage(title, content, regIdList.subList(i * FETCH_SIZE, (i+1) * FETCH_SIZE));
//          }
//      } else {
//          sendPushMessage(title, content, regIdList);
//      }
//  }
//  private void sendPushMessage(String title, String content, List<String> regIdList) {
//      Map<String, Object> mapResult = new HashMap<String, Object>();
//      try {
//          StringBuilder sb = new StringBuilder();
//          sb.append("{\"notification\" : {");
//          sb.append("\"title\" : \"").append(title);
//          sb.append("\", \"body\" : \"").append(content);
//          sb.append("\", \"click_action\" : \"").append("FCM_PLUGIN_ACTIVITY");
//          sb.append("\"}");
//          sb.append(", \"data\" : {");
//          sb.append("\"title\" : \"").append(title);
//          sb.append("\", \"body\" : \"").append(content);
//          sb.append("\"}");
//          sb.append(", \"registration_ids\" : [");
//
//          String comma = "";
//          for(String regId : regIdList) {
//              sb.append(comma).append("\"").append(regId).append("\"");
//              comma = ",";
//          }
//          
//          sb.append("]");
//          sb.append("}");
//          
//          logger.debug("MSG : ({})", sb);
//          
//          URL url = new URL("https://fcm.googleapis.com/fcm/send");
//          HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
//          
//          httpURLConnection.setDoOutput(true);
//          httpURLConnection.setRequestMethod("POST");
//          httpURLConnection.setRequestProperty("Content-Type", "application/json");
//          httpURLConnection.setRequestProperty("Authorization", "key=".concat(SasConstants.PUSH_API_KEY));
//          
//          OutputStream os = httpURLConnection.getOutputStream();
//          os.write(sb.toString().getBytes("UTF-8"));
//          os.flush();
//          os.close();
//          
//          StringBuilder sbOut = new StringBuilder();
//          int responseCode = httpURLConnection.getResponseCode();
//          if(responseCode == 200) {
//              List<String> listOut = IOUtils.readLines( httpURLConnection.getInputStream() );
//              for(String sLine : listOut) {
//                  sbOut.append(sLine);
//              }
//          } else {
//              sbOut.append("{\"error\" : \""+ responseCode +"\"}");
//          }
//          
//          httpURLConnection.disconnect();
//          
//          mapResult.put("result", sbOut.toString());
//      } catch(Exception e) {
//          e.printStackTrace();
//          mapResult.put("result", "Exception : " + e.getMessage());
//      }
//      logger.debug("Result : {}", mapResult);
//  }

}
