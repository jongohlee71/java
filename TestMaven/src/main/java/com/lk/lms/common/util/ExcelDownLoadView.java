package com.lk.lms.common.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.web.servlet.view.AbstractView;

import eu.bitwalker.useragentutils.Browser;
import nexcore.sprout.foundry.utils.UserAgentUtil;

public class ExcelDownLoadView extends AbstractView {
	
	/** The content type for an Excel response */
    private static final String CONTENT_TYPE = "application/vnd.ms-excel";
    
    private SXSSFWorkbook workbook;
    
    private String downloadFileName ;
    
    private String charset = "utf-8";


    /**
     * Default Constructor.
     * Sets the content type of the view to "application/vnd.ms-excel".
     */
    public ExcelDownLoadView(SXSSFWorkbook workbook, String downloadFileName) {
        this.workbook = workbook;
        this.downloadFileName = downloadFileName;
        setContentType(CONTENT_TYPE + "; charset="+ charset);
    }

    @Override
    protected boolean generatesDownloadContent() {
        return true;
    }

    /**
     * Renders the Excel view, given the specified model.
     */
    @Override
    protected final void renderMergedOutputModel(
            Map<String, Object> model, HttpServletRequest request, HttpServletResponse response) throws Exception {

        // Set the content type.
        response.setContentType(getContentType());
        try{
            response.setHeader("Content-Disposition", "attachment; filename=\"" + getDownloadFileName(downloadFileName, UserAgentUtil.getUserAgent(request).getBrowser()) + "\"");
        }catch(Exception ex){
            response.setHeader("Content-Disposition", "attachment; filename=\"" + downloadFileName+ "\"");
        }
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setCharacterEncoding(charset);

        ServletOutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        workbook.dispose();
    }
    
    
    private String getDownloadFileName(String fileName, final Browser browser) throws UnsupportedEncodingException{
        switch(browser.getGroup()){
        case IE:
            fileName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");
            break;
        case FIREFOX:
        case OPERA:
        case SAFARI:
        case CHROME: //Webkit
        default:
            fileName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");
            break;
        }
        
        return fileName;
    }

}
