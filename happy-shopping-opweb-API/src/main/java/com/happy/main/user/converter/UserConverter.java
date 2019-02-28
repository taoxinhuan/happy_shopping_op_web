/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.user.converter;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.happy.core.dto.UserDTO;
import com.happy.main.user.model.UserVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年11月14日 上午10:31:41
 */
public class UserConverter {
	public static UserVO toUserVO(UserDTO dto) {
		if (null != dto) {
			UserVO vo = new UserVO();
			vo.setId(dto.getId());
			vo.setMobile(dto.getMobile());
			vo.setNickname(dto.getNickname());
			vo.setPassword(dto.getPassword());
			vo.setRealname(dto.getRealname());
			vo.setState(dto.getState());
			vo.setType(dto.getType());
			vo.setCreateTime(dto.getCreateTime());
			return vo;
		}
		return null;
	}
	
	public static List<UserVO> toUserVOList(List<UserDTO> dtoList) {
		if (CollectionUtils.isNotEmpty(dtoList)) {
			List<UserVO> voList = new ArrayList<UserVO>();
			dtoList.forEach(dto -> {
				UserVO userVO = toUserVO(dto);
				voList.add(userVO);
			});
			return voList;
		}
		return null;
	}
}
