package com.lk.lms.common.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IfLogDAO {
	
	public int insertIfLog(Map<?, ?> map);

    public int updateIfLog(Map<?, ?> map);
    
    public int exceptionIfLog(Map<?, ?> map);

}
