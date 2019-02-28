/**   
 * Copyright © 2019 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.user.model;

import java.io.Serializable;

/**
 * @description
 * @author taoxinhuan
 * @date 2019年1月21日 下午12:16:30
 */
public class WeixinUser implements Serializable {
	private static final long serialVersionUID = -79809901172884887L;
	
	private String username;
	
	private String password;
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
