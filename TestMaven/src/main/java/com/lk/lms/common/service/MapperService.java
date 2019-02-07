package com.lk.lms.common.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lk.lms.common.vo.CamelCaseMap;

@Service("mapperService")
public class MapperService {
	
	@Autowired
    SqlSessionFactory sqlSessionFactory;
    
    public List<CamelCaseMap> getList(String sqlId, Map<?, ?> map) {
        List<CamelCaseMap> list = null;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        try {
            list = sqlSession.selectList(sqlId, map);
        } finally {
            sqlSession.close();
        }

        return list;
    }
    
    public CamelCaseMap getItem(String sqlId, Map<?, ?> map) {
    	CamelCaseMap object = null;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        try {
            object = (CamelCaseMap) sqlSession.selectOne(sqlId, map);
        } finally {
            sqlSession.close();
        }
        
        return object;
    }
    
    public int insertItem(String sqlId, Map<?, ?> map) {
        int rv = -1;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        try {
            rv = sqlSession.insert(sqlId, map);
        } finally {
            sqlSession.close();
        }
        
        return rv;
    }

    public int updateItem(String sqlId, Map<?, ?> map) {
        int rv = -1;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        try {
            rv = sqlSession.update(sqlId, map);
        } finally {
            sqlSession.close();
        }
        
        return rv;
    }

    public int deleteItem(String sqlId, Map<?, ?> map) {
        int rv = -1;
        SqlSession sqlSession = sqlSessionFactory.openSession();
        
        try {
            rv = sqlSession.delete(sqlId, map);
        } finally {
            sqlSession.close();
        }
        
        return rv;
    }

}
