package com.happy.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

/**
 * @description
 * @author taoxinhuan
 * @date 2018年11月1日 上午9:41:47
 */
@SpringBootApplication
@ComponentScan(basePackages = "com.happy.main")
public class AppStart extends SpringBootServletInitializer {
	public static void main(String[] args) {
		SpringApplication.run(AppStart.class, args);
	}
	
	/**
	 * 项目打成war包
	 */
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AppStart.class);
	}
}
