/**
 * sprout-root.xml 에서 .properties 내역을 읽어서 세팅 
 * @author 06304
 *
 */

package com.lk.lms.common.util;

public class CommonPropertyBean {
	
	public static String RUNTIME_MODE;
    public static String BO_SERVER_URL_REAL;
    public static String BO_SERVER_URL;
    public static String FO_SERVER_URL;
    
    public static String ERP_WS_URL = "http://172.30.60.33:50000";
    public static String ERP_WS_SENDER_SERVICE = "GSA13_D";
    public static String ERP_WS_USERNAME = "IF_GSA13";
    public static String ERP_WS_PASSWORD = "Zhjz454928";
    
    public static String ECARD_WS_URL = "http://168.154.244.11:50000";

    public CommonPropertyBean() {
    }

    public static void setRUNTIME_MODE(String rUNTIME_MODE) {
        RUNTIME_MODE = rUNTIME_MODE;
    }

    public static void setBO_SERVER_URL_REAL(String bO_SERVER_URL_REAL) {
        BO_SERVER_URL_REAL = bO_SERVER_URL_REAL;
    }

    public static void setBO_SERVER_URL(String bO_SERVER_URL) {
        BO_SERVER_URL = bO_SERVER_URL;
    }

    public static void setFO_SERVER_URL(String fO_SERVER_URL) {
        FO_SERVER_URL = fO_SERVER_URL;
    }

    public static void setERP_WS_URL(String eRP_WS_URL) {
        ERP_WS_URL = eRP_WS_URL;
    }

    public static void setERP_WS_SENDER_SERVICE(String eRP_WS_SENDER_SERVICE) {
        ERP_WS_SENDER_SERVICE = eRP_WS_SENDER_SERVICE;
    }

    public static void setERP_WS_USERNAME(String eRP_WS_USERNAME) {
        ERP_WS_USERNAME = eRP_WS_USERNAME;
    }

    public static void setERP_WS_PASSWORD(String eRP_WS_URLPASSWORD) {
        ERP_WS_PASSWORD = eRP_WS_URLPASSWORD;
    }

    public static void setECARD_WS_URL(String eCARD_WS_URL) {
        ECARD_WS_URL = eCARD_WS_URL;
    }

}
