/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.menu.converter;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.happy.core.dto.MenuDTO;
import com.happy.main.menu.model.MenuVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年12月3日 下午4:02:51
 */
public class MenuConverter {
	public static MenuVO toMenuVO(MenuDTO dto) {
		if (null != dto) {
			MenuVO vo = new MenuVO();
			vo.setId(dto.getId().toString());
			vo.setIcon(dto.getIcon());
			vo.setParentId(dto.getParentId());
			vo.setPrivilegeName(dto.getPrivilegeName());
			vo.setPrivilegeType(dto.getPrivilegeType());
			vo.setSequence(dto.getSequence());
			vo.setTitle(dto.getTitle());
			vo.setUrl(dto.getUrl());
			return vo;
		}
		return null;
	}
	
	public static List<MenuVO> toMenuVOList(List<MenuDTO> dtoList) {
		if (CollectionUtils.isNotEmpty(dtoList)) {
			List<MenuVO> voList = new ArrayList<MenuVO>();
			dtoList.forEach(dto -> {
				MenuVO MenuVO = toMenuVO(dto);
				voList.add(MenuVO);
			});
			return voList;
		}
		return null;
	}
}
