/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.happy.core.dto.UserAddressDTO;
import com.happy.core.dto.UserDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.UserAddressQuery;
import com.happy.core.query.UserQuery;
import com.happy.core.service.UserAddressService;
import com.happy.core.service.UserService;
import com.happy.main.user.converter.UserConverter;
import com.happy.main.user.model.UserVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年11月14日 上午10:22:58
 */
@Service
public class UserAPIService {
	@Reference
	private UserService userService;
	
	@Reference
	private UserAddressService userAddressService;
	
	public void insertUser(UserDTO dto, Long opUserId) {
		userService.insertUser(dto, opUserId);
	}
	
	public void updateUser(UserDTO dto, Long opUserId) {
		userService.updateUser(dto, opUserId);
	}
	
	public PageList<UserVO> listUser(UserQuery query) {
		PageList<UserDTO> listUser = userService.listUser(query);
		PageList<UserVO> voPageList = new PageList<>();
		List<UserDTO> dataList = listUser.getDataList();
		voPageList.setPager(listUser.getPager());
		voPageList.setDataList(UserConverter.toUserVOList(dataList));
		return voPageList;
	}
	
	public void startUser(Long userId, Long opUserId) {
		userService.startUser(userId, opUserId);
	}
	
	public void stopUser(Long userId, Long opUserId) {
		userService.stopUser(userId, opUserId);
	}
	
	public UserVO getUserByLogin(String account, String password, Integer type) {
		// 0代表管理员
		UserDTO userDTO = userService.getUserByLogin(account, password, type);
		return UserConverter.toUserVO(userDTO);
	}
	
	public UserVO getKeeperByMobile(String mobile) {
		UserDTO keeper = userService.getKeeperByMobile(mobile);
		if (null != keeper) {
			UserVO vo = UserConverter.toUserVO(keeper);
			List<UserAddressDTO> listByUserId = userAddressService.listByUserId(keeper.getId());
			vo.setAdddressList(listByUserId);
			return vo;
		}
		return null;
	}
	
	public UserVO getUserById(Long id) {
		UserDTO userDTO = userService.getUserById(id);
		return UserConverter.toUserVO(userDTO);
	}
	
	public List<UserAddressDTO> listUserAddressByUserId(Long userId) {
		List<UserAddressDTO> listByUserId = userAddressService.listByUserId(userId);
		return listByUserId;
	}
	
	public void insertUserAddress(UserAddressDTO dto) {
		userAddressService.insertUserAddress(dto);
	}
	
	public void updateUserAddress(UserAddressDTO dto) {
		userAddressService.updateUserAddress(dto);
	}
	
	public PageList<UserAddressDTO> listUserAddress(UserAddressQuery query) {
		PageList<UserAddressDTO> listUserAddress = userAddressService.listUserAddress(query);
		return listUserAddress;
	}
}
