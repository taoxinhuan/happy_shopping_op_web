/**   
 * Copyright © 2018 哈皮电子商务有限公司. All rights reserved.
 */
package com.happy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**  
 * @description :服务启动
 * @author taoxinhuan
 * @date 2018年11月2日 下午4:33:46  
 */
@SpringBootApplication
@MapperScan("com.happy.dao")
public class ApiStart {
	public static void main(String[] args) {
		SpringApplication.run(ApiStart.class, args);
	}
}
