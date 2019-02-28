/**   
 * Copyright © 2019 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.happy.core.dto.DictionaryDTO;
import com.happy.core.dto.DictionaryItemDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.DictionaryItemQuery;
import com.happy.core.query.DictionaryQuery;
import com.happy.main.constant.WebConstants;
import com.happy.main.dictionary.model.DictionaryItemVO;
import com.happy.main.dictionary.model.DictionaryVO;
import com.happy.main.dictionary.service.DictionaryAPIService;
import com.happy.main.pagemodel.BaseResult;
import com.happy.main.pagemodel.PagesResult;
import com.happy.main.pagemodel.ROResult;

/**
 * @description
 * @author taoxinhuan
 * @date 2019年1月24日 下午9:26:49
 */
@RestController
public class DictionaryController {
	@Autowired
	private DictionaryAPIService dictionaryAPIService;
	
	@PostMapping("/templates/dictionary/getDictionaryById/{id}")
	public BaseResult getDictionaryById(@PathVariable("id") Long id) {
		DictionaryVO dictionaryById = dictionaryAPIService.getDictionaryById(id);
		ROResult<DictionaryVO> result = new ROResult<DictionaryVO>();
		result.setData(dictionaryById);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@GetMapping("/templates/dictionary/getDictionaryByCode/{code}")
	public BaseResult getDictionaryByCode(@PathVariable("code") String code) {
		DictionaryVO dictionaryById = dictionaryAPIService.getDictionaryByCode(code);
		ROResult<DictionaryVO> result = new ROResult<DictionaryVO>();
		result.setData(dictionaryById);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/deleteDictionary/{id}")
	public BaseResult deleteDictionary(@PathVariable("id") Long id) {
		dictionaryAPIService.deleteDictionary(id);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/insertDictionary")
	public BaseResult insertDictionary(@RequestBody DictionaryDTO record) {
		dictionaryAPIService.insertDictionary(record);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/updateDictionary")
	public BaseResult updateDictionary(@RequestBody DictionaryDTO record) {
		dictionaryAPIService.updateDictionary(record);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/listDictionary")
	public BaseResult listDictionary(@RequestBody DictionaryQuery query) {
		PageList<DictionaryVO> listDictionary = dictionaryAPIService.listDictionary(query);
		PagesResult<DictionaryVO> result = new PagesResult<DictionaryVO>();
		result.setDatas(listDictionary);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/deleteDictionaryItem/{id}")
	public BaseResult deleteDictionaryItem(@PathVariable("id") Long id) {
		dictionaryAPIService.deleteDictionaryItem(id);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/insertDictionaryItem")
	public BaseResult insertDictionaryItem(@RequestBody DictionaryItemDTO dictionaryItem) {
		dictionaryAPIService.insertDictionaryItem(dictionaryItem);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/updateDictionaryItem")
	public BaseResult updateDictionaryItem(@RequestBody DictionaryItemDTO dictionaryItem) {
		dictionaryAPIService.updateDictionaryItem(dictionaryItem);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/dictionary/listDictionaryItem")
	public BaseResult listDictionaryItem(@RequestBody DictionaryItemQuery query) {
		PageList<DictionaryItemVO> listDictionaryItem = dictionaryAPIService.listDictionaryItem(query);
		PagesResult<DictionaryItemVO> result = new PagesResult<DictionaryItemVO>();
		result.setDatas(listDictionaryItem);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
}
