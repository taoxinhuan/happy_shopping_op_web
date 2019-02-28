/**   
 * Copyright © 2019 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.dictionary.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.happy.core.dto.DictionaryDTO;
import com.happy.core.dto.DictionaryItemDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.DictionaryItemQuery;
import com.happy.core.query.DictionaryQuery;
import com.happy.core.service.DictionaryItemService;
import com.happy.core.service.DictionaryService;
import com.happy.main.dictionary.converter.DictionaryConverter;
import com.happy.main.dictionary.model.DictionaryItemVO;
import com.happy.main.dictionary.model.DictionaryVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2019年1月24日 下午9:28:25
 */
@Service
public class DictionaryAPIService {
	@Reference
	private DictionaryService dictionaryService;
	
	@Reference
	private DictionaryItemService dictionaryItemService;
	
	/**
	 * @description
	 * @param id
	 * @return
	 * @return DictionaryDTO
	 */
	public DictionaryVO getDictionaryById(Long id) {
		DictionaryDTO dictionaryDTO = dictionaryService.getDictionaryById(id);
		DictionaryVO dictionaryVO = DictionaryConverter.toDictionaryVO(dictionaryDTO);
		return dictionaryVO;
	}
	
	/**
	 * @description：根据代码查询字典详细信息
	 * @param code
	 * @return
	 * @return DictionaryVO
	 */
	public DictionaryVO getDictionaryByCode(String code) {
		DictionaryDTO dictionaryDTO = dictionaryService.getDictionaryByCode(code);
		DictionaryVO dictionaryVO = DictionaryConverter.toDictionaryVO(dictionaryDTO);
		return dictionaryVO;
	}
	
	/**
	 * @description:删除字典
	 * @param id
	 * @return void
	 */
	public void deleteDictionary(Long id) {
		dictionaryService.deleteDictionary(id);
	}
	
	/**
	 * @description：插入字典
	 * @param record
	 * @return void
	 */
	public void insertDictionary(DictionaryDTO record) {
		dictionaryService.insertDictionary(record);
	}
	
	/**
	 * @description：更新字典
	 * @param record
	 * @return void
	 */
	public void updateDictionary(DictionaryDTO record) {
		dictionaryService.updateDictionary(record);
	}
	
	/**
	 * @description：分页查询字典
	 * @param query
	 * @return
	 * @return PageList<DictionaryVO>
	 */
	public PageList<DictionaryVO> listDictionary(DictionaryQuery query) {
		PageList<DictionaryDTO> listDictionary = dictionaryService.listDictionary(query);
		List<DictionaryDTO> dataList = listDictionary.getDataList();
		PageList<DictionaryVO> voList = new PageList<DictionaryVO>();
		voList.setDataList(DictionaryConverter.toDictionaryVOList(dataList));
		voList.setPager(listDictionary.getPager());
		return voList;
	}
	
	/**
	 * @description:删除字典项
	 * @param id
	 * @return void
	 */
	public void deleteDictionaryItem(Long id) {
		dictionaryItemService.deleteDictionaryItem(id);
	}
	
	/**
	 * @description :插入字典项
	 * @param dictionaryItem
	 * @return void
	 */
	public void insertDictionaryItem(DictionaryItemDTO dictionaryItem) {
		dictionaryItemService.insertDictionaryItem(dictionaryItem);
	}
	
	/**
	 * @description ：更改字典项
	 * @param dictionaryItem
	 * @return void
	 */
	public void updateDictionaryItem(DictionaryItemDTO dictionaryItem) {
		dictionaryItemService.updateDictionaryItem(dictionaryItem);
	}
	
	/**
	 * @description ：分页查询字典项
	 * @param query
	 * @return
	 * @return PageList<DictionaryItemVO>
	 */
	public PageList<DictionaryItemVO> listDictionaryItem(DictionaryItemQuery query) {
		PageList<DictionaryItemDTO> listDictionaryItem = dictionaryItemService.listDictionaryItem(query);
		List<DictionaryItemDTO> dataList = listDictionaryItem.getDataList();
		PageList<DictionaryItemVO> voList = new PageList<DictionaryItemVO>();
		voList.setDataList(DictionaryConverter.toDictionaryItemVOList(dataList));
		voList.setPager(listDictionaryItem.getPager());
		return voList;
	}
}
