/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.pagemodel;

import com.happy.main.constant.WebConstants;

public class ROResult<T> extends BaseResult {
	T data;
	
	public T getData() {
		return data;
	}
	
	public void setData(T data) {
		this.data = data;
	}
	
	public ROResult() {
		super();
	}
	
	public ROResult(T data) {
		super(WebConstants.RESULT_SUCCESS);
		this.setData(data);
	}
}
