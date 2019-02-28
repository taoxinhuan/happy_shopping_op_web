/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.happy.core.dto.ShopDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.ShopQuery;
import com.happy.main.constant.WebConstants;
import com.happy.main.pagemodel.BaseResult;
import com.happy.main.pagemodel.PagesResult;
import com.happy.main.pagemodel.ROResult;
import com.happy.main.shop.model.ShopVO;
import com.happy.main.shop.service.ShopAPIService;
import com.happy.main.user.model.UserVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年11月14日 下午8:57:34
 */
@RestController
public class ShopController {
	@Autowired
	private ShopAPIService shopAPIService;
	
	@PostMapping("/templates/shop/insertShop")
	public BaseResult insertShop(@RequestBody ShopDTO dto, UserVO user) {
		shopAPIService.insertShop(dto, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/shop/updateShop")
	public BaseResult updateShop(@RequestBody ShopDTO dto, UserVO user) {
		shopAPIService.updateShop(dto, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/shop/startShop/{shopId}")
	public BaseResult startShop(@PathVariable("shopId") Long shopId, UserVO user) {
		shopAPIService.startShop(shopId, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/shop/stopShop/{shopId}")
	public BaseResult stopShop(@PathVariable("shopId") Long shopId, UserVO user) {
		shopAPIService.stopShop(shopId, user.getId());
		BaseResult result = new BaseResult();
		result.setResult(WebConstants.RESULT_SUCCESS);
		return result;
	}
	
	@PostMapping("/templates/shop/getShopById/{id}")
	public BaseResult getShopById(@PathVariable("id") Long id) {
		ShopVO shopById = shopAPIService.getShopById(id);
		ROResult<ShopVO> result = new ROResult<>();
		result.setResult(WebConstants.RESULT_SUCCESS);
		result.setData(shopById);
		return result;
	}
	
	@PostMapping("/templates/shop/listShop")
	public BaseResult listShop(@RequestBody ShopQuery query) {
		PageList<ShopVO> listShop = shopAPIService.listShop(query);
		PagesResult<ShopVO> result = new PagesResult<ShopVO>();
		result.setResult(WebConstants.RESULT_SUCCESS);
		result.setDatas(listShop);
		return result;
	}
}
