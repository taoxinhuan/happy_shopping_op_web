/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.happy.core.dto.MenuDTO;
import com.happy.main.constant.WebConstants;
import com.happy.main.menu.model.MenuVO;
import com.happy.main.menu.service.MenuAPIService;
import com.happy.main.pagemodel.BaseResult;
import com.happy.main.pagemodel.ListResult;
import com.happy.main.pagemodel.ROResult;

/**
 * @description :菜单管理
 * @author taoxinhuan
 * @date 2018年12月3日 下午4:09:27
 */
@RestController
public class MenuController {
	@Autowired
	private MenuAPIService menuAPIService;
	
	@PostMapping("/templates/menu/listMenu")
	public BaseResult listUser() {
		ListResult<MenuVO> page = new ListResult<>();
		List<MenuVO> listMenu = menuAPIService.listMenu();
		page.setList(listMenu);
		page.setResult(WebConstants.RESULT_SUCCESS);
		return page;
	}
	
	@PostMapping("/templates/menu/insertMenu")
	public BaseResult insertMenu(@RequestBody MenuDTO dto) {
		BaseResult page = new BaseResult();
		menuAPIService.insertMenu(dto);
		page.setResult(WebConstants.RESULT_SUCCESS);
		return page;
	}
	
	@PostMapping("/templates/menu/updateMenu")
	public BaseResult updateMenu(@RequestBody MenuDTO dto) {
		BaseResult page = new BaseResult();
		menuAPIService.updateMenu(dto);
		page.setResult(WebConstants.RESULT_SUCCESS);
		return page;
	}
	
	@PostMapping("/templates/menu/deleteMenu/{id}")
	public BaseResult listUser(@PathVariable("id") Long id) {
		BaseResult page = new BaseResult();
		menuAPIService.deleteMenu(id);
		page.setResult(WebConstants.RESULT_SUCCESS);
		return page;
	}
	
	@PostMapping("/templates/menu/listSonMenu/{id}")
	public BaseResult listSonMenu(@PathVariable("id") Long id) {
		ListResult<MenuVO> page = new ListResult<>();
		List<MenuVO> listSonMenu = menuAPIService.listSonMenu(id);
		page.setResult(WebConstants.RESULT_SUCCESS);
		page.setList(listSonMenu);
		return page;
	}
	
	@PostMapping("/templates/menu/getMenuById/{id}")
	public BaseResult getMenuById(@PathVariable("id") Long id) {
		ROResult<MenuVO> page = new ROResult<>();
		MenuVO vo = menuAPIService.getMenuById(id);
		page.setResult(WebConstants.RESULT_SUCCESS);
		page.setData(vo);
		return page;
	}
}
