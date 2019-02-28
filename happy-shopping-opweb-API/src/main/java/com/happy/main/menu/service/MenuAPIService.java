/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.menu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.happy.core.dto.MenuDTO;
import com.happy.core.service.MenuService;
import com.happy.main.menu.converter.MenuConverter;
import com.happy.main.menu.model.MenuVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年12月3日 下午3:58:41
 */
@Service
public class MenuAPIService {
	@Reference
	private MenuService menuService;
	
	/**
	 * @description:查询菜单
	 * @return
	 * @return List<MenuVO>
	 */
	public List<MenuVO> listMenu() {
		List<MenuDTO> listMenu = menuService.listMenu();
		List<MenuVO> menuVOList = MenuConverter.toMenuVOList(listMenu);
		return menuVOList;
	}
	
	/**
	 * @description:增加菜单
	 * @param po
	 * @return void
	 */
	public void insertMenu(MenuDTO dto) {
		menuService.insertMenu(dto);
	}
	
	/**
	 * @description:修改菜单
	 * @param menu
	 * @return void
	 */
	public void updateMenu(MenuDTO dto) {
		menuService.updateMenu(dto);
	}
	
	/**
	 * @description:删除菜单
	 * @param id
	 * @return void
	 */
	public void deleteMenu(Long id) {
		menuService.deleteMenu(id);
	}
	
	public List<MenuVO> listSonMenu(Long pid) {
		List<MenuDTO> listSonMenu = menuService.listSonMenu(pid);
		List<MenuVO> menuVOList = MenuConverter.toMenuVOList(listSonMenu);
		return menuVOList;
	}
	
	public MenuVO getMenuById(Long id) {
		MenuDTO menuById = menuService.getMenuById(id);
		MenuVO menuVO = MenuConverter.toMenuVO(menuById);
		return menuVO;
	}
}
