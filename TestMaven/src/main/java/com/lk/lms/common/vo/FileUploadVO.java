package com.lk.lms.common.vo;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FileUploadVO {
	
	private String guid;
    private String fileId;
    private String typeId;
    private String fileName;
    private String filePath;
    private long fileSize;
    private String regUser;
    private Date regDate;
    
    public FileUploadVO(){}
    
    public FileUploadVO(String guid, String fileId) {
        this.guid = guid;
        this.fileId = fileId;
    }
    public FileUploadVO(String fileId, String typeId, String fileName, String filePath, long fileSize){
        this.fileId = fileId;
        this.typeId = typeId;
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.regDate = new Date();
    }

    public String getFileId() {
        return fileId;
    }
    public void setFileId(String fileId) {
        this.fileId = fileId;
    }
    public String getTypeId() {
        return typeId;
    }
    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }
    public String getFileName() {
        return fileName;
    }
    public void setFileName(String fileName) {
        this.fileName = fileName;
    }
    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    public long getFileSize() {
        return fileSize;
    }
    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }
    public String getRegUser() {
        return regUser;
    }
    public void setRegUser(String regUser) {
        this.regUser = regUser;
    }
    public Date getRegDate() {
        return regDate;
    }
    public void setRegDate(Date regDate) {
        this.regDate = regDate;
    }
    public Map<String, Object> convertToMap() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("seqNo", getGuid());
        map.put("fileId", getFileId());
        map.put("fileName", getFileName());
        map.put("filePath", getFilePath());
        map.put("fileSize", getFileSize());
        map.put("regUserId", getRegUser());
        return map;
    }
    
    @Override
    public String toString() {
        return "FileUploadVO [guid=" + guid + ", fileId=" + fileId + ", typeId=" + typeId + ", fileName=" + fileName
            + ", filePath=" + filePath + ", fileSize=" + fileSize + ", regUser=" + regUser + ", regDate=" + regDate
            + "]";
    }
    public String getGuid() {
        return guid;
    }
    public void setGuid(String guid) {
        this.guid = guid;
    }

}
