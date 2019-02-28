package com.happy.main.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration // 必须存在
@EnableSwagger2 // 必须存在
public class SwaggerConfig {
	@Bean
	public Docket customDocket() {
		return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
				.apis(RequestHandlerSelectors.basePackage("com.happy.main.controller")).paths(PathSelectors.any())
				.build();
	}
	
	private ApiInfo apiInfo() {
		Contact contact = new Contact("陶鑫焕", "http://www.taoxinhuan.xin/", "1721481815@qq.com");
		return new ApiInfoBuilder().title("前台API接口").description("前台API接口").contact(contact).version("1.0").build();
	}
}
