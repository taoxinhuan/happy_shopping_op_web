/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.user.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.happy.core.dto.UserAddressDTO;

/**
 * @description :用户信息
 * @author taoxinhuan
 * @date 2018年11月14日 上午10:17:53
 */
public class UserVO implements Serializable {
	private static final long serialVersionUID = -4366605432504332629L;
	
	/**
	 * 用户Id
	 */
	private Long id;
	
	/**
	 * 真实名称
	 */
	private String realname;
	
	/**
	 * 昵称
	 */
	private String nickname;
	
	/**
	 * 手机号
	 */
	private String mobile;
	
	/**
	 * 密码
	 */
	private String password;
	
	/**
	 * 用户类型 @see UserTypeEnum
	 */
	private Integer type;
	
	/**
	 * 状态 @see StateEnum
	 */
	private Integer state;
	
	private List<UserAddressDTO> adddressList;
	
	private String sessionId;
	
	private Date createTime;
	
	public Date getCreateTime() {
		return createTime;
	}
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getRealname() {
		return realname;
	}
	
	public void setRealname(String realname) {
		this.realname = realname;
	}
	
	public String getNickname() {
		return nickname;
	}
	
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	
	public String getMobile() {
		return mobile;
	}
	
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Integer getType() {
		return type;
	}
	
	public void setType(Integer type) {
		this.type = type;
	}
	
	public Integer getState() {
		return state;
	}
	
	public void setState(Integer state) {
		this.state = state;
	}
	
	public List<UserAddressDTO> getAdddressList() {
		return adddressList;
	}
	
	public void setAdddressList(List<UserAddressDTO> adddressList) {
		this.adddressList = adddressList;
	}
	
	public String getSessionId() {
		return sessionId;
	}
	
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
}
