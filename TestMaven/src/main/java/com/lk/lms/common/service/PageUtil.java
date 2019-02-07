package com.lk.lms.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import nexcore.sprout.foundry.constants.SproutConstants;
import com.lk.lms.common.vo.CamelCaseMap;
import com.lk.lms.common.vo.PageVO;

@Service("pageUtil")
public class PageUtil {
	
	//private Logger logger = LoggerFactory.getLogger(this.getClass());
    private static Logger logger = LoggerFactory.getLogger(PageUtil.class);
    
    /** 기본 페이지당 조회건수, client에서 rowPerPage 를 전송하지 않을 경우 사용함  */
    private static int defaultRowPerPage = 10;
    /** 기본 페이지 개수, 없으면  */
    private static int defaultPageSize = 10;
    

    public static Map<String, Object> getPageInfo(List<?> list, Map<?, ?> map) {

        int rowPerPage = defaultRowPerPage;
        int pageSize = defaultPageSize;
        int pageNo = 1;

        try {
            rowPerPage = NumberUtils.toInt(map.get("rowPerPage")+"", defaultRowPerPage);
            pageNo = NumberUtils.toInt(map.get("pageNo")+"", 1);
            pageSize = NumberUtils.toInt(map.get("pageSize")+"", defaultPageSize);
        } catch (Exception e) {
            logger.error("PageInfo parameter : rowPerPage[], pageNo[], pageSize[]", map.get("rowPerPage"), map.get("pageNo"), map.get("pageSize"), e);
        }
        
        PageVO vo = new PageVO();
        vo.setRowPerPage(rowPerPage);
        vo.setPageSize(pageSize);
        vo.setPageNo(pageNo);
        
        
        return getPageInfo(list, vo);
    }
    public static Map<String, Object> getPageInfo(List<?> list, PageVO vo) {
        int totalCnt = -1;
        
        if (list != null && list.size() > 0) {
            Object obj = list.get(0);
            
            if (obj instanceof PageVO) {
                totalCnt = ((PageVO)obj).getTotalCnt();
            } else if (obj instanceof CamelCaseMap) {
                Object cnt = ((CamelCaseMap)obj).get("totalCnt");
                
                try {
                    totalCnt = (int) ((CamelCaseMap)obj).get("totalCnt");
                } catch (Exception e) {
                    logger.error("CamelCaseMap.totalCnt[{}] parse Error", cnt);
                    totalCnt = -1;
                }
                
            } else {
                logger.error("Element VO is not child [PageVO, CamelCaseMap]");
            }
        } else if (list != null && list.size() == 0) {
            totalCnt = 0;
        } else {
            logger.error("list parse Error", list);
        }
        
        return getPageInfo(totalCnt, vo);
    }
    
    /**
     * getPageInfo
     * <pre>
     * 조회된 총건수, VO를 바탕으로 
     *   PageNo(SproutConstants.PAGE_NO), PageSize(SproutConstants.PAGE_SIZE)
     * , TotalCnt(SproutConstants.TOTAL_CNT),TotalPage(SproutConstants.TOTAL_PAGE)를 구성하여 Map 을 Return 하며 
     * PageVO 에 ,firstRow,lastRow,totalCnt,totalPage 를 세팅한다 .
     * </pre>
     * @param totalCnt
     * @param vo
     * @return Map<String,Integer> (firstRow,lastRow,totalCnt,totalPage)
     */
    public static Map<String, Object> getPageInfo(int totalCnt, PageVO vo) {
        // Page 정보 구성
        Map<String, Object> pageInfo1 = new HashMap<String, Object>();
        if(vo.getRowPerPage() < 1){// 0 또는 음수라면
            vo.setRowPerPage(defaultRowPerPage);
        }
        if(vo.getPageSize() < 1){
            vo.setPageSize(defaultPageSize);
        }
        
        // 총 페이지 수
        int totalPage = (int)Math.ceil((double)totalCnt / (double)vo.getRowPerPage());
        /* 첫번째 row번호*/
        int firstRow = (vo.getPageNo() - 1) * vo.getRowPerPage() + 1;
        /* 마지막 row번호*/
        int lastRow =     vo.getPageNo() * vo.getRowPerPage();
         /* 한 화면의 시작 페이지 번호 */
        int startPageNo = ((vo.getPageNo()) / vo.getPageSize())  * vo.getPageSize() + 1;
        /* 한 화면의 끝 페이지 번호 */
        int endPageNo = ((startPageNo + vo.getPageSize()-1) > totalPage) ? totalPage :  (firstRow + vo.getPageSize()-1);
        
//        pageInfo.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
//        pageInfo.put(SproutConstants.LAST_ROW_INDEX, lastRow);
//        pageInfo.put(SproutConstants.TOTAL_CNT, totalCnt);
//        pageInfo.put(SproutConstants.TOTAL_PAGE, totalPage);
//        pageInfo.put(SproutConstants.PAGE_NO, vo.getPageNo());
//        pageInfo.put(SproutConstants.PAGE_SIZE, vo.getPageSize());
//        pageInfo.put(SproutConstants.START_PAGE_NO, startPageNo);
//        pageInfo.put(SproutConstants.END_PAGE_NO, endPageNo);
//        pageInfo.put(SproutConstants.ROW_PER_PAGE, vo.getRowPerPage());

        // alopex pager 정보 3가지 : 이것만 있으면됨 위에꺼 확인후 삭제
//        pageInfo.put("dataLength", totalCnt);
//        pageInfo.put("current", vo.getPageNo());
        
        // Alopex Grid Style {perPage:10, totalLength:107, currentPage:1,list:[]}
        pageInfo1.put("perPage", vo.getRowPerPage());
        pageInfo1.put("totalLength", totalCnt);
        pageInfo1.put("currentPage", vo.getPageNo());
        pageInfo1.put("currentLength", vo.getRowPerPage());
        //currentLength : gridData.RowsLength,


        vo.setFirstRowIndex(firstRow);
        vo.setLastRowIndex(lastRow);
        vo.setTotalCnt(totalCnt);
        vo.setTotalPage(totalPage);
        vo.setEndPageNo(endPageNo);
        return pageInfo1;
    }
    
    
    /**
     * getPageInfo  
     * <pre>
     * Vo 미사용시 사용 
     * 조회된 총건수, RequestMap을 바탕으로 
     *   PageNo(SproutConstants.PAGE_NO), PageSize(SproutConstants.PAGE_SIZE)
     * , TotalCnt(SproutConstants.TOTAL_CNT),TotalPage(SproutConstants.TOTAL_PAGE)를 구성하여 Map 을 Return 하며 
     * Map 에 ,firstRow,lastRow,totalCnt,totalPage 를 세팅한다 .
     * </pre>
     * @param totalCnt
     * @param requestMap<String, Integer>
     * @return Map<String,Integer> (firstRow,lastRow,totalCnt,totalPage)
     */
    public static Map<String, Integer> getPageInfo(int totalCnt, Map<String, Integer> requestMap) {
        int pageNo=1;
        if(requestMap.containsKey(SproutConstants.PAGE_NO)){
            pageNo=(Integer)requestMap.get(SproutConstants.PAGE_NO);
        }
        int rowPerPage=defaultRowPerPage;
        if(requestMap.containsKey(SproutConstants.ROW_PER_PAGE)){
            rowPerPage=(Integer)requestMap.get(SproutConstants.ROW_PER_PAGE);
        }
        int pageSize = defaultPageSize;
        if(requestMap.containsKey(SproutConstants.PAGE_SIZE)){
            pageSize=(Integer)requestMap.get(SproutConstants.PAGE_SIZE);
        }
        
        // 총 페이지 수
        int totalPage = (int)Math.ceil((double)totalCnt / (double)rowPerPage);
        /* 첫번째 row번호*/
        int firstRow = (pageNo - 1) * rowPerPage + 1;
        /* 마지막 row번호*/
        int lastRow =     pageNo * rowPerPage;
         /* 한 화면의 시작 페이지 번호 */
        int startPageNo = (pageNo / pageSize)  * pageSize + 1;
        /* 한 화면의 끝 페이지 번호 */
        int endPageNo = ((startPageNo + pageSize -1) > totalPage) ? totalPage :  (firstRow + pageSize - 1);
        
        // Page 정보 구성 (client return 할 값)
        Map<String, Integer> pageInfo=new HashMap<String,Integer>();
        pageInfo.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
        pageInfo.put(SproutConstants.LAST_ROW_INDEX, lastRow);
        pageInfo.put(SproutConstants.TOTAL_CNT, totalCnt);
        pageInfo.put(SproutConstants.TOTAL_PAGE, totalPage);
        pageInfo.put(SproutConstants.PAGE_NO, pageNo);
        pageInfo.put(SproutConstants.END_PAGE_NO, endPageNo);
        pageInfo.put(SproutConstants.ROW_PER_PAGE, rowPerPage);
        
        requestMap.put(SproutConstants.FIRST_ROW_INDEX, firstRow);
        requestMap.put(SproutConstants.LAST_ROW_INDEX, lastRow);
        requestMap.put(SproutConstants.TOTAL_CNT, totalCnt);
        requestMap.put(SproutConstants.TOTAL_PAGE, totalPage);
        requestMap.put(SproutConstants.END_PAGE_NO, endPageNo);
        requestMap.put(SproutConstants.ROW_PER_PAGE, rowPerPage);
        
        return pageInfo;
    }
    
    
    /**
     * setDefaultRowPerPage
     * 기본 행의 개수를 설정
     * @param defaultRowPerPage void
     */
    @Value("${paging.defaultRowPerPage:10}")
    public void setDefaultRowPerPage(int defaultRowPerPage) {
        PageUtil.defaultRowPerPage = defaultRowPerPage;
    }

}
