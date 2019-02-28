/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.shop.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年12月5日 下午4:10:36
 */
public class ShopVO implements Serializable {
	/**
	 * id
	 */
	private Long id;
	
	/**
	 * 名称
	 */
	private String name;
	
	/**
	 * 店主Id
	 */
	private Long keeperId;
	
	/**
	 * 地址
	 */
	private String address;
	
	/**
	 * 经度
	 */
	private String longitude;
	
	/**
	 * 纬度
	 */
	private String latitude;
	
	/**
	 * 状态 @see StateEnum
	 */
	private Integer state;
	
	private String keeperName;
	
	private String nickName;
	
	private String mobile;
	
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
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Long getKeeperId() {
		return keeperId;
	}
	
	public void setKeeperId(Long keeperId) {
		this.keeperId = keeperId;
	}
	
	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getLongitude() {
		return longitude;
	}
	
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	
	public String getLatitude() {
		return latitude;
	}
	
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	public Integer getState() {
		return state;
	}
	
	public void setState(Integer state) {
		this.state = state;
	}
	
	public String getKeeperName() {
		return keeperName;
	}
	
	public void setKeeperName(String keeperName) {
		this.keeperName = keeperName;
	}
	
	public String getMobile() {
		return mobile;
	}
	
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	
	public String getNickName() {
		return nickName;
	}
	
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
}
