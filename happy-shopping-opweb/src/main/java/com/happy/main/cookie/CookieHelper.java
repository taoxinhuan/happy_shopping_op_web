/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.cookie;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.happy.main.constant.WebConstants;

public class CookieHelper {
	private HttpServletResponse response;
	
	private HttpServletRequest request;
	
	public CookieHelper() {
	}
	
	public void setRequest(HttpServletRequest request) {
		if (request == null) {
			throw new NullPointerException("request should not be null");
		} else {
			this.request = request;
		}
	}
	
	public void setResponse(HttpServletResponse response) {
		if (response == null) {
			throw new NullPointerException("response should not be null");
		} else {
			this.response = response;
		}
	}
	
	private List<Cookie> cookies;
	
	private List<Cookie> getAll() {
		if (cookies == null) {
			Cookie[] array = request.getCookies();
			if (array == null)
				return null;
			cookies = new ArrayList<>(array.length);
			for (int i = 0, len = array.length; i < len; i++) {
				cookies.add((Cookie) array[i].clone());
			}
		}
		return cookies;
	}
	
	public Cookie get(String name) {
		List<Cookie> all = getAll();
		if (all == null)
			return null;
		Iterator<Cookie> iter = all.iterator();
		while (iter.hasNext()) {
			Cookie ck = iter.next();
			if (ck.getName().equals(name)) {
				return ck;
			}
		}
		return null;
	}
	
	public void addCookie(Cookie c) {
		if (c != null) {
			response.addCookie(c);
		}
	}
	
	public void addCookie(String name, String value) {
		addCookie(create(name, value));
	}
	
	public void add(String name, String value, Integer maxAge) {
		addCookie(create(name, value, maxAge));
	}
	
	private Cookie create(String name, String value) {
		return new Cookie(name, value);
	}
	
	private Cookie create(String name, String value, int maxAge) {
		Cookie sc = create(name, value);
		sc.setMaxAge(maxAge);
		return sc;
	}
	
	public void deleteCookie(String name) {
		Cookie c = get(name);
		if (c != null) {
			c.setMaxAge(0);
			addCookie(c);
		}
	}
	
	/**
	 * 添加错误信息到Cookie中
	 */
	public void addErrorInfo(String msg) {
		Cookie c = this.create(WebConstants.COOKIE_ERROR_KEY, encode(msg));
		c.setMaxAge(15);
		addCookie(c);
	}
	
	private static String encode(String identity) {
		try {
			return URLEncoder.encode(identity, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}
	
	public String toString() {
		List<Cookie> all = getAll();
		if (all == null)
			return super.toString();
		StringBuilder out = new StringBuilder();
		out.append('[');
		for (int i = 0; i < all.size(); i++) {
			if (i != 0)
				out.append(", ");
			Cookie c = all.get(i);
			out.append(c.getName());
			out.append('=');
			out.append(c.getValue());
		}
		out.append(']');
		return out.toString();
	}
	
	public static String buildUserInfoKey(String sessionID) {
		return "loginContext:" + sessionID;
	}
	
	public static String buildVerifyCodeKey(String sessionID) {
		return "vc:" + sessionID;
	}
}
