/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.interceptor;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.dubbo.common.URL;
import com.happy.main.user.model.UserVO;

@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {
	private static final Logger LOG = LoggerFactory.getLogger(AuthInterceptor.class);
	
	@Value("${webpath.loginurl}")
	private String loginUrl;
	
	@SuppressWarnings("rawtypes")
	@Autowired
	private RedisTemplate redisTemplate;
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		super.afterCompletion(request, response, handler, ex);
	}
	
	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		super.afterConcurrentHandlingStarted(request, response, handler);
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		super.postHandle(request, response, handler, modelAndView);
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if (!(handler instanceof HandlerMethod)) {
			System.out.println("test01");
			return true;
		}
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Class<?> beanType = handlerMethod.getBeanType();
		String name = beanType.getName();
		String sid = request.getSession().getId();
		String requestType = request.getHeader("request_type");
		String weixinSid = request.getHeader("weixin_sid");
		if ("com.happy.main.controller.LoginController".equals(name)) {
			return true;
		}
		// 如果是小程序登陆，根据小程序登陆时保存的SID来获取登陆信息
		if ("weixin".equals(requestType)) {
			return AddRedisTime(response, weixinSid);
		}
		// 如果是web登陆那么直接获取SessionID
		return AddRedisTime(response, sid);
	}
	
	/**
	 * @description
	 * @param response
	 * @param sid
	 * @return void
	 */
	private boolean AddRedisTime(HttpServletResponse response, String sid) {
		try {
			BoundValueOperations<Object, Object> ops = redisTemplate.boundValueOps(sid);
			UserVO userVo = (UserVO) ops.get();
			if (userVo == null) {
				return sendResponse(response, loginUrl, "登录信息:" + sid + "已过期");
			}
			// 加五分钟缓存时间
			ops.expire(60 * 30, TimeUnit.SECONDS);
		} catch (Exception e) {
			LOG.error("登录信息:" + sid + "已过期", e);
		}
		return true;
	}
	
	private boolean sendResponse(HttpServletResponse response, String redirectURI, String message) throws IOException {
		response.addHeader("redirectURI", redirectURI);
		response.addHeader("responseMessage", URL.encode(message));
		response.sendError(HttpStatus.FORBIDDEN.value(), message);
		LOG.info("禁止访问1：" + message);
		return false;
	}
}
