package com.lk.lms.common.util;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import nexcore.sprout.foundry.commons.impl.DefaultUserIdFinder;
import com.lk.lms.common.vo.AuthVO;
import com.lk.lms.common.vo.LoginVO;

public class SessionUtil {

	static public Logger logger = LoggerFactory.getLogger(SessionUtil.class);

	/**
	 * @deprecated getLoginId
	 * @param request
	 * @return
	 */
	static public String getUserId(HttpServletRequest request) {
		DefaultUserIdFinder duif = new DefaultUserIdFinder();

		return duif.getUserId(request);
	}

	static public String getLoginId(HttpServletRequest request) {
		DefaultUserIdFinder duif = new DefaultUserIdFinder();

		return duif.getUserId(request);
	}

	static public void setLoginInfo(HttpServletRequest request, LoginVO loginVO) {
		setSessionValue(request, LmsConstants.LOGIN_SESSION_INFO, loginVO);
	}

	static public LoginVO getLoginInfo(HttpServletRequest request) {
		LoginVO loginVO = (LoginVO) getSessionValue(request, LmsConstants.LOGIN_SESSION_INFO);

		return loginVO;
	}

	static public Object getSessionValue(HttpServletRequest request, String key) {
		HttpSession session = request.getSession(false);

		if (session != null) {
			return session.getAttribute(key);
		}

		return null;
	}

	static public void removeSessionValue(HttpServletRequest request, String key) {
		HttpSession session = request.getSession(false);

		if (session != null) {
			session.removeAttribute(key);
		}

	}

	static public void setSessionValue(HttpServletRequest request, String key, Object value) {
		HttpSession session = request.getSession(false);

		if (session != null) {
			session.setAttribute(key, value);
		}

	}

	/**
	 * contextPath 을 제외한 요청 URI
	 * 
	 * @param request
	 * @return
	 */
	static public String getProgramURI(HttpServletRequest request) {
		String cp = request.getContextPath();
		String uri = request.getRequestURI();
		if (cp != null && cp.length() > 1) {
			uri = StringUtils.substring(uri, cp.length());
		}

		return uri;
	}

	/**
	 * menuId 에 의한 권한 설정 조회 없으면 programUri 로 권한 설정 조회
	 * 
	 * @param menuList
	 * @param menuId
	 * @param programUri
	 * @return
	 */
	static public AuthVO findAuthVO(List<AuthVO> menuList, String menuId, String programUri) {
		logger.debug("findList menuList.size() : [{}]", menuList.size());
		logger.debug("findList menuId : [{}]", menuId);
		logger.debug("findList programUri : [{}]", programUri);

		// menuId 로 찾은 권한
		AuthVO avMenu = new AuthVO();
		avMenu.setUseYn("N"); // default value

		// main 예외적용
		if ("/".equals(programUri) || "/main.do".equals(programUri)) {
			avMenu.setUseYn("Y");
			avMenu.setAuthorR("Y");
			logger.debug("findList by exception authVO : {}", avMenu);
			return avMenu;
		}

		// programUri 로 권한 조회
		String findUri = programUri;
		int idxDo = StringUtils.lastIndexOf(programUri, ".do");
		if (idxDo > 0) {
			findUri = StringUtils.substring(findUri, 0, idxDo);
		}

		if (StringUtils.isEmpty(menuId) || "undefined".equalsIgnoreCase(menuId)) {
			// programUri 로 권한 조회 : 같은 프로그램이 여러 메뉴에 연결시에는 첫번째 메뉴권한으로 가져옴
			// URI 로 찾은 권한
			AuthVO avUri = null;
			avUri = SessionUtil.findAuthVOByUri(menuList, programUri);
			if (avUri == null) {
				avUri = new AuthVO();
				avUri.setUseYn("N"); // default value
			}

			return avUri;
		} else {
			// menuId 로 권한 조회
			for (AuthVO map : menuList) {
				if (menuId.equals(map.getMenuId())) {
					avMenu = (AuthVO) map;
					logger.debug("findList by menuId authVO : {}", avMenu);
					break;
					// return avMenu;
				}
			}
		}

		logger.debug("findList by default authVO : {}", avMenu);
		return avMenu;
	}

	/**
	 * prgramURI 만으로 해당 메뉴권한 찾기
	 * 
	 * @param menuList
	 * @param programUri
	 * @return
	 */
	static public AuthVO findAuthVOByUri(List<AuthVO> menuList, String programUri) {
		// logger.debug("findAuthVOByUri programUri : [{}]", programUri);

		// URI 로 찾은 권한
		AuthVO avUri = null;

		// programUri 로 권한 조회
		String findUri = programUri;
		int idxDo = StringUtils.lastIndexOf(programUri, ".do");
		if (idxDo > 0) {
			findUri = StringUtils.substring(findUri, 0, idxDo);
		}

		// programUri 로 권한 조회 : 같은 프로그램이 여러 메뉴에 연결시에는 첫번째 메뉴권한으로 가져옴
		// useYn, groupUseYn
		for (AuthVO map : menuList) {
			if (StringUtils.indexOf(map.getProgrmUrl(), findUri) == 0 && "Y".equalsIgnoreCase(map.getUseYn())) {
				avUri = (AuthVO) map;
				break;
			}
		}

		// menuUseYn
		if (avUri == null) {
			for (AuthVO map : menuList) {
				if (StringUtils.indexOf(map.getProgrmUrl(), findUri) == 0 && "Y".equalsIgnoreCase(map.getMenuUseYn())) {
					avUri = (AuthVO) map;
					break;
				}
			}
		}

		// progrmUseYn
		if (avUri == null) {
			for (AuthVO map : menuList) {
				if (StringUtils.indexOf(map.getProgrmUrl(), findUri) == 0
						&& "Y".equalsIgnoreCase(map.getProgrmUseYn())) {
					avUri = (AuthVO) map;
					break;
				}
			}
		}

		// logger.debug("findList by programUri authVO : {}", avUri);
		return avUri;
	}

}
