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

import com.happy.core.dto.UserAddressDTO;
import com.happy.core.dto.UserDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.UserAddressQuery;
import com.happy.core.query.UserQuery;
import com.happy.main.constant.WebConstants;
import com.happy.main.pagemodel.BaseResult;
import com.happy.main.pagemodel.ListResult;
import com.happy.main.pagemodel.PagesResult;
import com.happy.main.pagemodel.ROResult;
import com.happy.main.user.model.UserVO;
import com.happy.main.user.service.UserAPIService;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年11月14日 下午8:59:10
 */
@RestController
public class UserController {
	@Autowired
	private UserAPIService userAPIService;
	
	@PostMapping("/templates/user/listUser")
	public BaseResult listUser(@RequestBody UserQuery query) {
		PagesResult<UserVO> page = new PagesResult<>();
		PageList<UserVO> listUser = userAPIService.listUser(query);
		page.setDatas(listUser);
		page.setResult(WebConstants.RESULT_SUCCESS);
		return page;
	}
	
	@PostMapping("/templates/user/insertUser")
	public BaseResult insertUser(@RequestBody UserDTO dto, UserVO user) {
		userAPIService.insertUser(dto, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/updateUser")
	public BaseResult updateUser(@RequestBody UserDTO dto, UserVO user) {
		userAPIService.updateUser(dto, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/startUser/{userId}")
	public BaseResult startUser(@PathVariable("userId") Long userId, UserVO user) {
		userAPIService.startUser(userId, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/stopUser/{userId}")
	public BaseResult stopUser(@PathVariable("userId") Long userId, UserVO user) {
		userAPIService.stopUser(userId, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/getKeeperByMobile/{mobile}")
	public BaseResult getKeeperByMobile(@PathVariable("mobile") String mobile) {
		UserVO keeper = userAPIService.getKeeperByMobile(mobile);
		ROResult<UserVO> result = new ROResult<UserVO>();
		result.setData(keeper);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/getUserById/{id}")
	public BaseResult getKeeperByMobile(@PathVariable("id") Long id) {
		UserVO user = userAPIService.getUserById(id);
		ROResult<UserVO> result = new ROResult<UserVO>();
		result.setData(user);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/listUserAddressByUserId/{userId}")
	public BaseResult listUserAddressByUserId(@PathVariable("userId") Long userId) {
		List<UserAddressDTO> listUserAddressByUserId = userAPIService.listUserAddressByUserId(userId);
		ListResult<UserAddressDTO> result = new ListResult<>();
		result.setList(listUserAddressByUserId);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/listUserAddress")
	public BaseResult listUserAddress(@RequestBody UserAddressQuery query) {
		PageList<UserAddressDTO> listUserAddress = userAPIService.listUserAddress(query);
		PagesResult<UserAddressDTO> result = new PagesResult<UserAddressDTO>();
		result.setDatas(listUserAddress);
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/insertUserAddress")
	public BaseResult insertUserAddress(@RequestBody UserAddressDTO dto) {
		userAPIService.insertUserAddress(dto);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/user/updateUserAddress")
	public BaseResult updateUserAddress(@RequestBody UserAddressDTO dto) {
		userAPIService.updateUserAddress(dto);
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
}
