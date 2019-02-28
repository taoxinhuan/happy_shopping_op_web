/**   
 * Copyright © 2019 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.dictionary.model;

import java.io.Serializable;

/**
 * @description
 * @author taoxinhuan
 * @date 2019年1月24日 下午9:31:51
 */
public class DictionaryItemVO implements Serializable {
	private Long id;
	
	private String key;
	
	private String value;
	
	private String sequence;
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getKey() {
		return key;
	}
	
	public void setKey(String key) {
		this.key = key;
	}
	
	public String getValue() {
		return value;
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public String getSequence() {
		return sequence;
	}
	
	public void setSequence(String sequence) {
		this.sequence = sequence;
	}
}
