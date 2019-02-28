package com.happy.main.pagemodel;

import java.io.Serializable;

import com.happy.core.page.PageList;
import com.happy.main.constant.WebConstants;

/*********************************************
 * ClassName:PagesResult Description: 分页数据返回类
 * @author wangran Date 2016年3月04日
 *********************************************/
public class PagesResult<T extends Serializable> extends BaseResult {
	private PageList<T> datas;
	
	public PageList<T> getDatas() {
		return datas;
	}
	
	public void setDatas(PageList<T> datas) {
		this.datas = datas;
	}
	
	public PagesResult() {
		super();
	}
	
	public PagesResult(String message, String result) {
		super(message, result);
	}
	
	public PagesResult(PageList<T> list) {
		super(WebConstants.RESULT_SUCCESS);
		this.setDatas(list);
	}
}
