/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.menu.model;

import java.io.Serializable;
import java.util.List;

import com.happy.core.dto.MenuDTO;

/**
 * @description :menuVO
 * @author taoxinhuan
 * @date 2018年12月3日 下午3:57:49
 */
public class MenuVO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	
	private String privilegeType;
	
	private String privilegeName;
	
	private String title;
	
	private String url;
	
	private String icon;
	
	private Long parentId;
	
	private String sequence;
	
	private List<MenuDTO> sonMenu;
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getPrivilegeType() {
		return privilegeType;
	}
	
	public void setPrivilegeType(String privilegeType) {
		this.privilegeType = privilegeType;
	}
	
	public String getPrivilegeName() {
		return privilegeName;
	}
	
	public void setPrivilegeName(String privilegeName) {
		this.privilegeName = privilegeName;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	
	public String getIcon() {
		return icon;
	}
	
	public void setIcon(String icon) {
		this.icon = icon;
	}
	
	public Long getParentId() {
		return parentId;
	}
	
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	
	public String getSequence() {
		return sequence;
	}
	
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
	
	public List<MenuDTO> getSonMenu() {
		return sonMenu;
	}
	
	public void setSonMenu(List<MenuDTO> sonMenu) {
		this.sonMenu = sonMenu;
	}
}
