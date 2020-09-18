package com.postit.webservice;

import nu.pattern.OpenCV;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PostitApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostitApplication.class, args);
		OpenCV.loadLocally();
	}

}
