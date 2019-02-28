/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.pagemodel;

import java.util.List;

import com.happy.main.constant.WebConstants;

/*********************************************
 * ClassName:PagesResult Description: 分页数据返回类
 * @author wangran Date 2016年3月04日
 *********************************************/
public class ListResult<T> extends BaseResult {
	public List<T> list;
	
	public List<T> getList() {
		return list;
	}
	
	public void setList(List<T> list) {
		this.list = list;
	}
	
	public ListResult() {
		super();
	}
	
	public ListResult(String message, String result) {
		super(message, result);
	}
	
	public ListResult(List<T> list) {
		super(WebConstants.RESULT_SUCCESS);
		this.setList(list);
	}
}
