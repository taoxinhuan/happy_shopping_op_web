/*
 * Copyright © 2016 北京易酒批电子商务有限公司. All rights reserved.
 */
package com.happy.main.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.print.PrintException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.happy.main.pagemodel.BaseResult;

@ControllerAdvice
public class DefaultExceptionHandler {
	private static final Logger LOG = LoggerFactory.getLogger(DefaultExceptionHandler.class);
	
	@ExceptionHandler({ Exception.class })
	@ResponseBody
	public BaseResult processUnauthenticatedException(HttpServletRequest request, Exception exception) {
		String servletPath = request.getServletPath(); // 获取请求的URL
		BaseResult failedResult = null;
		String message = getFinalMessage(exception);
		String msg = "请求URL：" + servletPath + "，发生错误：" + message;
		LOG.error(msg, exception);
		failedResult = new BaseResult(getTruncateMessage(message), exception);
		return failedResult;
	}
	
	/**
	 * 获取最末层的异常提示信息
	 * @param exception 异常
	 * @return 最末层的异常提示信息
	 */
	private String getFinalMessage(Exception exception) {
		String message = exception.getMessage();
		Throwable cause = exception.getCause();
		// 循环3层获取到异常提示信息
		int i = 0;
		while (null != cause && i < 3) {
			message = cause.getMessage();
			cause = cause.getCause();
			i++;
		}
		return message;
	}
	
	/**
	 * 超过500长度截断返回消息
	 * @param message
	 * @return String
	 */
	private String getTruncateMessage(String message) {
		String truncateMessage = message;
		if (StringUtils.isNotEmpty(message) && message.length() > 500) {
			truncateMessage = message.substring(0, 499);
			truncateMessage = truncateMessage + "...";
		}
		return truncateMessage;
	}
	
	/**
	 * 异常处理，HTML输出<br>
	 * @return: void
	 */
	@ExceptionHandler({ PrintException.class })
	public void processPrintException(HttpServletRequest request, HttpServletResponse response,
			PrintException exception) throws IOException {
		String servletPath = request.getServletPath(); // 获取请求的URL
		LOG.error("请求URL:\"{}\",发生错误：{}", servletPath, exception.getMessage(), exception);
		response.setCharacterEncoding("UTF-8");
		PrintWriter pw = response.getWriter();
		pw.write("<HTML>\n");
		pw.write("<head>\n");
		pw.write("<meta charset=\"UTF-8\">\n");
		pw.write("<title>运营管理平台 | 错误页面</title>\n");
		pw.write(
				"<link href=\"../assets/global/plugins/bootstrap/css/bootstrap.min.css\" rel=\"stylesheet\" type=\"text/css\"/>\n");
		pw.write("<link href=\"../assets/pages/css/error.css\" rel=\"stylesheet\" type=\"text/css\"/>\n");
		pw.write("</head>\n");
		pw.write("<body>\n");
		pw.write("<div style=\"margin-top:68px;\">\n");
		pw.write("<div class=\"col-md-12 page-404\">\n");
		pw.write(
				"	<div class=\"number\" style=\"top:-5px;\" onclick=\"document.getElementById('errorDiv').style.display=(document.getElementById('errorDiv').style.display=='none')?'':'none'\">");
		pw.write("<img src=\"../assets/layout/img/error.jpg\"></div>\n");
		pw.write("	<div class=\"details\">\n");
		pw.write("		<h3>糟糕，页面上出现错误，无法响应。</h3>\n");
		pw.write("		<p>请几分钟后刷新页面。</p>\n");
		pw.write("		<p><i class=\"fa fa-home\"></i>&nbsp;&nbsp;<a href=\"index.html\">返回首页</a></p>\n");
		pw.write("	</div>\n");
		pw.write("</div>\n");
		pw.write("<span id=\"errorDiv\" style=\"display:none\" class=\"col-md-10 col-md-offset-1\"><pre>");
		exception.printStackTrace(pw);
		pw.write("</pre></span>");
		pw.write("</div>\n");
		pw.write("</body>");
		pw.write("</HTML>");
		pw.flush();
		pw.close();
	}
}
