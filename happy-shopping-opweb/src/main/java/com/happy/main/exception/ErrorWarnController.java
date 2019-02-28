package com.happy.main.exception;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

/**
 * login
 */
@Controller
public class ErrorWarnController implements ErrorController {
	private static final String ERROR_PATH = "/error";
	
	@Value("${webpath.loginurl}")
	private String loginUrl;
	
	@RequestMapping(value = ERROR_PATH)
	public ModelAndView error() {
		return new ModelAndView(new RedirectView(loginUrl));
	}
	
	@Override
	public String getErrorPath() {
		return ERROR_PATH;
	}
	
	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
		return new EmbeddedServletContainerCustomizer() {
			@Override
			public void customize(ConfigurableEmbeddedServletContainer container) {
				ErrorPage error404Page = new ErrorPage(HttpStatus.NOT_FOUND, loginUrl);
				container.addErrorPages(error404Page);
				ErrorPage error403Page = new ErrorPage(HttpStatus.FORBIDDEN, loginUrl);
				container.addErrorPages(error403Page);
				ErrorPage error405Page = new ErrorPage(HttpStatus.METHOD_NOT_ALLOWED, loginUrl);
				container.addErrorPages(error405Page);
			}
		};
	}
}
