package com.lk.lms.common.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.lk.lms.common.vo.AuthVO;
import com.lk.lms.common.vo.CamelCaseMap;
import com.lk.lms.common.vo.LoginVO;

@Mapper
public interface PushDAO {
	
	/**
     * PUSH 발송대상 조회
     * @return
     */
    public Map<String,String> selectPush(int sn);
    
    
    /**
     * PUSH 발송대상 리스트 조회
     * @return
     */
    public List<Map<String,String>> selectPushProcList();

    /**
     * PUSH ProcessYn Update
     * @param param.sn 
     * @param param.processYn
     * @return
     */
    public int updatePushProcessYN(Map<String,String> param );

}
