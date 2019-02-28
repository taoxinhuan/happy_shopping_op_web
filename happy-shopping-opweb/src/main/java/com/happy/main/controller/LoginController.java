package com.happy.main.controller;

import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.happy.core.enums.UserTypeEnum;
import com.happy.main.constant.WebConstants;
import com.happy.main.cookie.CookieHelper;
import com.happy.main.pagemodel.ROResult;
import com.happy.main.user.model.UserVO;
import com.happy.main.user.model.WeixinUser;
import com.happy.main.user.service.UserAPIService;

/**
 * @description :登陆控制器
 * @author taoxinhuan
 * @date 2018年11月14日 下午4:31:26
 */
@RestController
public class LoginController {
	@Autowired
	private UserAPIService userAPIService;
	
	@SuppressWarnings("rawtypes")
	@Autowired
	private RedisTemplate redisTemplate;
	
	@RequestMapping("/")
	public ModelAndView toLogin() {
		return new ModelAndView(new RedirectView("/templates/login.html"));
	}
	
	@RequestMapping("/{page}")
	public ModelAndView toLoginPage(@PathVariable String page) {
		return new ModelAndView(new RedirectView("templates/login.html"));
	}
	
	/**
	 * 运营平台登陆用户登录校验
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/templates/userLogin", method = RequestMethod.POST)
	public ModelAndView login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password, HttpServletRequest request,
			HttpServletResponse response) {
		CookieHelper cookieHelper = new CookieHelper();
		cookieHelper.setResponse(response);
		cookieHelper.setRequest(request);
		UserVO userVO = userAPIService.getUserByLogin(username, password, UserTypeEnum.MANAGER.getKey());
		String sid = request.getSession().getId();
		if (null != userVO) {
			// 设置30分钟过期
			redisTemplate.boundValueOps(sid).set(userVO, 60 * 30, TimeUnit.SECONDS);
			return new ModelAndView(new RedirectView("index.html", true));
		}
		return new ModelAndView(new RedirectView("login.html?error=" + "Wrong account or Wrong Pasword", true));
	}
	
	/**
	 * 小程序登陆用户登录校验
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/templates/weixinLogin", method = RequestMethod.POST)
	public ROResult<UserVO> weixinLogin(@RequestBody WeixinUser user, HttpServletRequest request,
			HttpServletResponse response) {
		CookieHelper cookieHelper = new CookieHelper();
		cookieHelper.setResponse(response);
		cookieHelper.setRequest(request);
		String username = user.getUsername();
		String sid = request.getSession().getId();
		// 所有类型的用户都可进入小程序
		UserVO userVO = userAPIService.getUserByLogin(username, user.getPassword(), null);
		// 设置30分钟过期
		ROResult<UserVO> result = new ROResult<UserVO>();
		result.setData(userVO);
		if (userVO != null) {
			redisTemplate.boundValueOps(sid).set(userVO, 60 * 30, TimeUnit.SECONDS);
			// 将sessionID返回给小程序
			userVO.setSessionId(sid);
			result.setResult(WebConstants.RESULT_SUCCESS);
			return result;
		}
		result.setResult(WebConstants.RESULT_FAILED);
		return result;
	}
}
