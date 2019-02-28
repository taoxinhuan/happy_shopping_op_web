/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.config;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.happy.main.user.model.UserVO;

/**
 * 用户上下文参数解析器. Created by Lifeng on 2016/10/25.
 */
@Component
public class UserInfoArgumentResolver implements HandlerMethodArgumentResolver {
	@Autowired
	private RedisTemplate<Object, Object> redisTemplate;
	
	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		return parameter.getParameterType().isAssignableFrom(UserVO.class);
	}
	
	/**
	 * 从redis缓存中获取用户信息放入上下文
	 */
	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		final HttpServletRequest request = ((ServletWebRequest) webRequest).getRequest();
		String sid = request.getSession().getId();
		UserVO userVO = (UserVO) redisTemplate.boundValueOps(sid).get();
		return userVO;
	}
}
