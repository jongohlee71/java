package com.lk.lms.common.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.view.AbstractView;

import eu.bitwalker.useragentutils.Browser;
import nexcore.sprout.foundry.utils.UserAgentUtil;

public class DownloadView extends AbstractView {
	
	public static final String DEFAULT_CONTENT_TYPE = MediaType.APPLICATION_OCTET_STREAM_VALUE;
    private static Logger log = LoggerFactory.getLogger(DownloadView.class);

    private File file;
    private String fileName;
    
    public DownloadView(File file){
        this(file, file.getName(), DEFAULT_CONTENT_TYPE);
    }

    public DownloadView(File file, String fileName){
        this(file, fileName, DEFAULT_CONTENT_TYPE);
    }

    public DownloadView(File file, String fileName, String contentType){
        this.file = file;
        this.fileName = fileName;
        
        setContentType(contentType);
    }
    
    @Override
    protected void renderMergedOutputModel(Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
        String fileName = StringUtils.defaultIfEmpty(this.fileName, file.getName());
        String contentType = getContentType();
        int length = (int) file.length();
        Browser browser = UserAgentUtil.getUserAgent(request).getBrowser();
        response.setContentType("text/plain;charset=UTF-8");
        response.setContentLength((int) length);
        response.setHeader("Content-Disposition", "attachment; filename=\"" + getDownloadFileName(fileName, browser) + "\"");
        response.setHeader("Content-Transfer-Encoding", "binary");

        if(log.isDebugEnabled()){
            Object args = new Object[]{ fileName, contentType, browser, file.getCanonicalPath(), length };
            log.debug("Render to download file. [file-name={}, content-type={}, browser={}, path={}, size={}]", args); 
        }
        
        OutputStream out = null;
        FileInputStream in = null;
        
        try{
            out = response.getOutputStream();
            in = new FileInputStream(file);

            IOUtils.copy(in, out);

        } catch(IOException e){
            e.printStackTrace(); //TODO: And so??
            throw e;
        } finally {
            IOUtils.closeQuietly(in);
//            IOUtils.closeQuietly(out);
        }

        out.flush();
    }

//    private boolean isSafePath(String fileName){
//        return true;
//    }
    
    private String getDownloadFileName(String fileName, final Browser browser) throws UnsupportedEncodingException{
        switch(browser.getGroup()){
        case IE:
            fileName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
            break;
        case FIREFOX:
        case OPERA:
        case SAFARI:
        case CHROME: //Webkit
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
            break;
        default:
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
            break;
        }
        
        return fileName;
    }

}
