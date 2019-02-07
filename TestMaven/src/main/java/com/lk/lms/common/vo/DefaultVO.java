package com.lk.lms.common.vo;

import java.io.Serializable;

import com.lk.lms.common.util.LmsUtil;

public class DefaultVO implements Cloneable, Serializable {
	
	private static final long serialVersionUID = -61820610067956490L;

    @Override
    public String toString() {
        return this.toJSON();
    }
    
    public String toJSON() {
        return LmsUtil.objToJsonStr(this);
    }

}
