/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy.main.shop.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.happy.core.dto.ShopDTO;
import com.happy.core.dto.UserDTO;
import com.happy.main.shop.model.ShopVO;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年12月5日 下午4:11:40
 */
public class ShopConverter {
	public static ShopVO toShopVO(ShopDTO dto) {
		if (null != dto) {
			ShopVO vo = new ShopVO();
			vo.setId(dto.getId());
			vo.setAddress(dto.getAddress());
			vo.setKeeperId(dto.getKeeperId());
			vo.setLatitude(dto.getLatitude());
			vo.setLongitude(dto.getLatitude());
			vo.setName(dto.getName());
			vo.setState(dto.getState());
			vo.setKeeperName(dto.getKeeperName());
			vo.setMobile(dto.getMobile());
			vo.setCreateTime(dto.getCreateTime());
			return vo;
		}
		return null;
	}
	
	public static List<ShopVO> toShopVOList(List<ShopDTO> dtoList, Map<Long, UserDTO> mapByUserIdSet) {
		if (CollectionUtils.isNotEmpty(dtoList)) {
			List<ShopVO> voList = new ArrayList<ShopVO>();
			dtoList.forEach(dto -> {
				UserDTO userDTO = mapByUserIdSet.get(dto.getKeeperId());
				ShopVO ShopVO = toShopVO(dto);
				ShopVO.setNickName(userDTO.getNickname());
				voList.add(ShopVO);
			});
			return voList;
		}
		return null;
	}
}
