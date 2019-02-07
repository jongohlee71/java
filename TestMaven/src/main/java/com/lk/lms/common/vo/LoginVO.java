package com.lk.lms.common.vo;

public class LoginVO extends DefaultVO {
	
	private static final long serialVersionUID = 688968381532064872L;

    private String loginId;         // 로그인ID
    private String userId;             // 사용자ID
    private String userNm;             // 사용자명
    private String userGbn;            // 회원유형코드
    private String userGbnNm;        // 회원유형명
    private String password;         // 패스워드
    private String password_ch;        // 패스워드 확인
    private String useYn;            // 사용여부
    private String acntExprtnYn;    // 계정만기여부 NOT
    private String acntLockYn;        // 계정잠금여부 NOT
    private String failrCo;            // 실패횟수
    private String frstLoginYn;        // 최초로그인여부
    private String lastChangeDt;    // 마지막변경일시
    private String pwExpire;        // 비밀번호 만기여부
    private String pwNotice;        // 비밀번호 변경경고

    private String groupId;            // 현재 그룹ID
    private String groupIds;        // 소유 그룹ID
    private String groupMultiYn;    // 복수 그룹 여부
    
    // history info
    private String loginGbn;        // 로그인구분
    private String conectIp;        // 접속IP
    private String sysGbn;            // 시스템구분
    
    // user info
    private String email;            // 이메일
    private String telnoOffm;        // 전화번호 : 사무실
    private String telnoMoblphon;    // 전화번호 : 핸드폰1
    private String telnoMoblphon2;    // 전화번호 : 핸드폰2
    private String telnoMoblphon3;    // 전화번호 : 핸드폰3
    private String fxnum;            // 팩스번호
    private String rspofcNm;        // 직책명
    
    private String deptCd;            // 부서코드
    private String deptNm;            // 부서명
    private String costCnterCd;        // 코스트센터코드
    private String costCnterNm;        // 코스트센터명
    
    // mapping info
    private String bplcCd;            // 사업장코드
    private String cusCd;            // 거래처코드
    private String agentCd;            // 판매점코드
    private String enduserCd;        // 수요처코드
    private String ccpyId;            // 협력사코드
    
    private String ccpyGbn;            // 협력사구분

    private String bplcCdNm;        // 사업장명
    private String cusCdNm;            // 거래처명
    private String agentCdNm;        // 판매점명
    private String enduserCdNm;        // 수요처명
    private String ccpyIdNm;        // 협력사명

    // 기사(M090)
    private String drverCd;        // 운전자 코드
    private String drverNm;        //운전자명
    private String vhcleNo;        // 차량번호
    private String vhcleNm;        //차랑명
    
    private String drverGbnCd;    // 운전자 구분코드
    
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String userPassword) {
        this.password = userPassword;
    }
    public String getPassword_ch() {
        return password_ch;
    }
    public void setPassword_ch(String password_ch) {
        this.password_ch = password_ch;
    }
    public String getUseYn() {
        return useYn;
    }
    public void setUseYn(String useFlag) {
        this.useYn = useFlag;
    }
    public String getAcntExprtnYn() {
        return acntExprtnYn;
    }
    public void setAcntExprtnYn(String accountNonExpired) {
        this.acntExprtnYn = accountNonExpired;
    }
    public String getAcntLockYn() {
        return acntLockYn;
    }
    public void setAcntLockYn(String accountNonLocked) {
        this.acntLockYn = accountNonLocked;
    }
    public String getFailrCo() {
        return failrCo;
    }
    public void setFailrCo(String failCnt) {
        this.failrCo = failCnt;
    }
    public String getFrstLoginYn() {
        return frstLoginYn;
    }
    public void setFrstLoginYn(String frtLoginFlag) {
        this.frstLoginYn = frtLoginFlag;
    }
    public String getLastChangeDt() {
        return lastChangeDt;
    }
    public void setLastChangeDt(String lastModPasswdDt) {
        this.lastChangeDt = lastModPasswdDt;
    }
    
    public String getLoginId() {
        return loginId;
    }
    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }
    public String getLoginGbn() {
        return loginGbn;
    }
    public void setLoginGbn(String loginSe) {
        this.loginGbn = loginSe;
    }
    public String getConectIp() {
        return conectIp;
    }
    public void setConectIp(String conectIp) {
        this.conectIp = conectIp;
    }
    public String getSysGbn() {
        return sysGbn;
    }
    public void setSysGbn(String sysSe) {
        this.sysGbn = sysSe;
    }
    public String getGroupId() {
        return groupId;
    }
    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }
    public String getUserNm() {
        return userNm;
    }
    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }
    public String getGroupIds() {
        return groupIds;
    }
    public void setGroupIds(String groupIds) {
        this.groupIds = groupIds;
    }
    public String getGroupMultiYn() {
        return groupMultiYn;
    }
    public void setGroupMultiYn(String groupMultiYn) {
        this.groupMultiYn = groupMultiYn;
    }
    public String getDeptCd() {
        return deptCd;
    }
    public void setDeptCd(String deptCd) {
        this.deptCd = deptCd;
    }
    public String getDeptNm() {
        return deptNm;
    }
    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }
    public String getBplcCd() {
        return bplcCd;
    }
    public void setBplcCd(String bplcCd) {
        this.bplcCd = bplcCd;
    }
    public String getCusCd() {
        return cusCd;
    }
    public void setCusCd(String cusCd) {
        this.cusCd = cusCd;
    }
    public String getAgentCd() {
        return agentCd;
    }
    public void setAgentCd(String agentCd) {
        this.agentCd = agentCd;
    }
    public String getEnduserCd() {
        return enduserCd;
    }
    public void setEnduserCd(String enduserCd) {
        this.enduserCd = enduserCd;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getTelnoOffm() {
        return telnoOffm;
    }
    public void setTelnoOffm(String telnoOffm) {
        this.telnoOffm = telnoOffm;
    }
    public String getTelnoMoblphon() {
        return telnoMoblphon;
    }
    public void setTelnoMoblphon(String telnoMoblphon) {
        this.telnoMoblphon = telnoMoblphon;
    }
    public String getFxnum() {
        return fxnum;
    }
    public void setFxnum(String fxnum) {
        this.fxnum = fxnum;
    }
    public String getRspofcNm() {
        return rspofcNm;
    }
    public void setRspofcNm(String rspofcNm) {
        this.rspofcNm = rspofcNm;
    }
    public String getUserGbn() {
        return userGbn;
    }
    public void setUserGbn(String userGbn) {
        this.userGbn = userGbn;
    }
    public String getUserGbnNm() {
        return userGbnNm;
    }
    public void setUserGbnNm(String userGbnNm) {
        this.userGbnNm = userGbnNm;
    }
    public String getBplcCdNm() {
        return bplcCdNm;
    }
    public void setBplcCdNm(String bplcCdNm) {
        this.bplcCdNm = bplcCdNm;
    }
    public String getCusCdNm() {
        return cusCdNm;
    }
    public void setCusCdNm(String cusCdNm) {
        this.cusCdNm = cusCdNm;
    }
    public String getAgentCdNm() {
        return agentCdNm;
    }
    public void setAgentCdNm(String agentCdNm) {
        this.agentCdNm = agentCdNm;
    }
    public String getEnduserCdNm() {
        return enduserCdNm;
    }
    public void setEnduserCdNm(String enduserCdNm) {
        this.enduserCdNm = enduserCdNm;
    }
    public String getCcpyId() {
        return ccpyId;
    }
    public void setCcpyId(String ccpyId) {
        this.ccpyId = ccpyId;
    }
    public String getCcpyIdNm() {
        return ccpyIdNm;
    }
    public void setCcpyIdNm(String ccpyIdNm) {
        this.ccpyIdNm = ccpyIdNm;
    }
    public String getCostCnterCd() {
        return costCnterCd;
    }
    public void setCostCnterCd(String costCnterCd) {
        this.costCnterCd = costCnterCd;
    }
    public String getCostCnterNm() {
        return costCnterNm;
    }
    public void setCostCnterNm(String costCnterNm) {
        this.costCnterNm = costCnterNm;
    }
    public String getDrverCd() {
        return drverCd;
    }
    public void setDrverCd(String drver_cd) {
        this.drverCd = drver_cd;
    }
    public String getVhcleNo() {
        return vhcleNo;
    }
    public void setVhcleNo(String vhcle_no) {
        this.vhcleNo = vhcle_no;
    }
    public String getDrverGbnCd() {
        return drverGbnCd;
    }
    public void setDrverGbnCd(String drver_gbn_cd) {
        this.drverGbnCd = drver_gbn_cd;
    }
    public String getDrverNm() {
        return drverNm;
    }
    public void setDrverNm(String drverNm) {
        this.drverNm = drverNm;
    }
    public String getVhcleNm() {
        return vhcleNm;
    }
    public void setVhcleNm(String vhcleNm) {
        this.vhcleNm = vhcleNm;
    }
    public String getCcpyGbn() {
        return ccpyGbn;
    }
    public void setCcpyGbn(String ccpyGbn) {
        this.ccpyGbn = ccpyGbn;
    }
    public String getPwExpire() {
        return pwExpire;
    }
    public void setPwExpire(String pwExpire) {
        this.pwExpire = pwExpire;
    }
    public String getPwNotice() {
        return pwNotice;
    }
    public void setPwNotice(String pwNotice) {
        this.pwNotice = pwNotice;
    }
    public String getTelnoMoblphon2() {
        return telnoMoblphon2;
    }
    public void setTelnoMoblphon2(String telnoMoblphon2) {
        this.telnoMoblphon2 = telnoMoblphon2;
    }
    public String getTelnoMoblphon3() {
        return telnoMoblphon3;
    }
    public void setTelnoMoblphon3(String telnoMoblphon3) {
        this.telnoMoblphon3 = telnoMoblphon3;
    }

}
