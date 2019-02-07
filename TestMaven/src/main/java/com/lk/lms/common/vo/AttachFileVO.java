package com.lk.lms.common.vo;

public class AttachFileVO extends DefaultVO {
	
private static final long serialVersionUID = -1731242700174927030L;
    
    private int atchSn;                // 첨부순번
    private int atchGroupSn;        // 첨부그룹순번
    private String sourcTable;        // 소스테이블
    private String orginlFileNm;    // 원본 파일명
    private String changeFileNm;    // 변경 파일명
    private String flpth;            // 파일경로
    private long fileSize;            // 파일사이즈
    private String fileTy;             // 파일타입
    
    private String registId;
    private String registDt;
    private String updtId;
    private String updtDt;
    
    public AttachFileVO(){}

    // SELECT NEXT VALUE FOR SEQ_COMMST010
    public AttachFileVO(String orginlFileNm, String changeFileNm, String filePath, long fileSize, String fileTy) {
        this.orginlFileNm = orginlFileNm;
        this.changeFileNm = changeFileNm;
        this.flpth = filePath;
        this.fileSize = fileSize;
        this.fileTy = fileTy;
    }

    @Override
    public String toString() {
        return toJSON();
    }

    public String getChangeFileNm() {
        return changeFileNm;
    }
    public void setChangeFileNm(String fileId) {
        this.changeFileNm = fileId;
    }
    public String getFileTy() {
        return fileTy;
    }
    public void setFileTy(String typeId) {
        this.fileTy = typeId;
    }
    public String getOrginlFileNm() {
        return orginlFileNm;
    }
    public void setOrginlFileNm(String fileName) {
        this.orginlFileNm = fileName;
    }
    public String getFlpth() {
        return flpth;
    }
    public void setFlpth(String filePath) {
        this.flpth = filePath;
    }
    public long getFileSize() {
        return fileSize;
    }
    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }
    public String getRegistId() {
        return registId;
    }
    public void setRegistId(String regUser) {
        this.registId = regUser;
    }
    public String getRegistDt() {
        return registDt;
    }
    public void setRegistDt(String regDate) {
        this.registDt = regDate;
    }

    public int getAtchSn() {
        return atchSn;
    }

    public void setAtchSn(int atchSn) {
        this.atchSn = atchSn;
    }

    public int getAtchGroupSn() {
        return atchGroupSn;
    }

    public void setAtchGroupSn(int atchGroupSn) {
        this.atchGroupSn = atchGroupSn;
    }

    public String getSourcTable() {
        return sourcTable;
    }

    public void setSourcTable(String sourcTable) {
        this.sourcTable = sourcTable;
    }

    public String getUpdtId() {
        return updtId;
    }

    public void setUpdtId(String updtId) {
        this.updtId = updtId;
    }

    public String getUpdtDt() {
        return updtDt;
    }

    public void setUpdtDt(String updtDt) {
        this.updtDt = updtDt;
    }

}
