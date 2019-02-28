/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.shop.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.alibaba.dubbo.config.annotation.Reference;
import com.happy.core.dto.ShopDTO;
import com.happy.core.dto.UserDTO;
import com.happy.core.page.PageList;
import com.happy.core.query.ShopQuery;
import com.happy.core.service.ShopService;
import com.happy.core.service.UserService;
import com.happy.main.shop.converter.ShopConverter;
import com.happy.main.shop.model.ShopVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年12月5日 下午4:06:18
 */
@Service
public class ShopAPIService {
	@Reference
	private ShopService shopServcie;
	
	@Reference
	private UserService userService;
	
	/**
	 * @description :新增店铺
	 * @param dto
	 * @return void
	 */
	public void insertShop(ShopDTO dto, Long opUserId) {
		shopServcie.insertShop(dto, opUserId);
	}
	
	/**
	 * @description：修改店铺
	 * @param dto
	 * @return void
	 */
	public void updateShop(ShopDTO dto, Long opUserId) {
		shopServcie.updateShop(dto, opUserId);
	}
	
	/**
	 * @description：启用店铺
	 * @param shopId
	 * @param opUserId
	 * @return void
	 */
	public void startShop(Long shopId, Long opUserId) {
		shopServcie.startShop(shopId, opUserId);
	}
	
	/**
	 * @description：停用店铺
	 * @param shopId
	 * @param opUserId
	 * @return void
	 */
	public void stopShop(Long shopId, Long opUserId) {
		shopServcie.stopShop(shopId, opUserId);
	}
	
	/**
	 * @description：根据ID获取店铺
	 * @param id
	 * @return
	 * @return Shop
	 */
	public ShopVO getShopById(Long id) {
		ShopDTO shopById = shopServcie.getShopById(id);
		ShopVO shopVO = ShopConverter.toShopVO(shopById);
		return shopVO;
	}
	
	/**
	 * @description:分页查询店铺
	 * @param query
	 * @return
	 * @return PageList<ShopDTO>
	 */
	public PageList<ShopVO> listShop(ShopQuery query) {
		PageList<ShopDTO> listShop = shopServcie.listShop(query);
		PageList<ShopVO> voList = new PageList<>();
		List<ShopDTO> dataList = listShop.getDataList();
		if (CollectionUtils.isNotEmpty(dataList)) {
			Set<Long> userIdSet = dataList.stream().map(s -> s.getKeeperId()).collect(Collectors.toSet());
			Map<Long, UserDTO> mapByUserIdSet = userService.getMapByUserIdSet(userIdSet);
			voList.setDataList(ShopConverter.toShopVOList(dataList, mapByUserIdSet));
		}
		voList.setPager(listShop.getPager());
		return voList;
	}
}
