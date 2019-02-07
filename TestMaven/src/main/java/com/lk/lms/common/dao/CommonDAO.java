package com.lk.lms.common.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.lk.lms.common.vo.CamelCaseMap;

@Mapper
public interface CommonDAO {
	
	public List<Map<?, ?>> selectCommonCodeList(Map<?, ?> map);
    
    public List<Map<?, ?>> selectMessageList(Map<?, ?> map);
    
    public List<Map<?, ?>> selectPrductList();
    
    public List<Map<?, ?>> selectEmailHist();
    
    public int updateEmailHist(Map<?, ?> map);

    public int insertEmailHist(Map<?, ?> map);
    
    public int insertSms(Map<?, ?> map);

}
