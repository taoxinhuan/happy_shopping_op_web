/**   
 * Copyright © 2019 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.dictionary.converter;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.happy.core.dto.DictionaryDTO;
import com.happy.core.dto.DictionaryItemDTO;
import com.happy.main.dictionary.model.DictionaryItemVO;
import com.happy.main.dictionary.model.DictionaryVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2019年1月24日 下午9:35:26
 */
public class DictionaryConverter {
	public static DictionaryVO toDictionaryVO(DictionaryDTO dto) {
		if (null != dto) {
			DictionaryVO vo = new DictionaryVO();
			vo.setId(dto.getId());
			vo.setName(dto.getName());
			vo.setSequence(dto.getSequence());
			vo.setCode(dto.getCode());
			vo.setItemList(dto.getItemList());
			return vo;
		}
		return null;
	}
	
	public static DictionaryItemVO toDictionaryItemVO(DictionaryItemDTO dto) {
		if (null != dto) {
			DictionaryItemVO po = new DictionaryItemVO();
			po.setId(dto.getId());
			po.setKey(dto.getKey());
			po.setValue(dto.getValue());
			po.setSequence(dto.getSequence());
			return po;
		}
		return null;
	}
	
	public static List<DictionaryVO> toDictionaryVOList(List<DictionaryDTO> dtoList) {
		if (CollectionUtils.isNotEmpty(dtoList)) {
			List<DictionaryVO> voList = new ArrayList<DictionaryVO>();
			dtoList.forEach(dto -> {
				DictionaryVO vo = toDictionaryVO(dto);
				voList.add(vo);
			});
			return voList;
		}
		return null;
	}
	
	public static List<DictionaryItemVO> toDictionaryItemVOList(List<DictionaryItemDTO> dtoList) {
		if (CollectionUtils.isNotEmpty(dtoList)) {
			List<DictionaryItemVO> voList = new ArrayList<DictionaryItemVO>();
			dtoList.forEach(dto -> {
				DictionaryItemVO vo = toDictionaryItemVO(dto);
				voList.add(vo);
			});
			return voList;
		}
		return null;
	}
}
