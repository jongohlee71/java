package com.lk.lms.common.util;

public class LmsConstants {
	
	/** 로그인 사용자 정보 */
    public static final String LOGIN_SESSION_INFO = "__loginInfo";

    /** 로그인 현재 그룹(프로파일) */
    public static final String LOGIN_SESSION_GROUP_CURRENT = "__LOGIN_SESSION_GROUP_CURRENT__";

    public static final String YES = "Y";
    public static final String NO = "N";
    
    public static final String MENU_CACHE_NAME = "menus";
    
    /** 인터페이스 구분 */
    public static final String IF_PROVIDER = "PROVIDER";
    public static final String IF_CONSUMER = "CONSUMER";
    
    /** FCM 서버키 */
    public static final String PUSH_API_KEY = "AAAA7FwMQVc:APA91bEm30Hmrz9N3jWFEVziKq_czpHxaJd8bFgfO6gSu6ozrZkbS4o20InqBHKYV9nXxGEiKSbSQZSEODvAXggg4K5AG7VTxwvyH9SQdahUN1UmWP2Y52RuSvybyW_tJGvrl6iCDP4h";
    
    /**
     * .properties 에서 읽어서 쓰는 변수들
     */
    public static final String RUNTIME_MODE = CommonPropertyBean.RUNTIME_MODE;
    public static final String BO_SERVER_URL_REAL = CommonPropertyBean.BO_SERVER_URL_REAL;
    public static final String BO_SERVER_URL = CommonPropertyBean.BO_SERVER_URL;
    public static final String FO_SERVER_URL = CommonPropertyBean.FO_SERVER_URL;

    public static final String ERP_WS_URL = CommonPropertyBean.ERP_WS_URL;
    public static final String ERP_WS_SENDER_SERVICE = CommonPropertyBean.ERP_WS_SENDER_SERVICE;
    public static final String ERP_WS_USERNAME = CommonPropertyBean.ERP_WS_USERNAME;
    public static final String ERP_WS_PASSWORD = CommonPropertyBean.ERP_WS_PASSWORD;
    
    public static final String ECARD_WS_URL = CommonPropertyBean.ECARD_WS_URL;

}
