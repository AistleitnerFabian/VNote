package com.server.vnote.vnote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import nu.pattern.OpenCV;

@SpringBootApplication
public class VNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(VNoteApplication.class, args);
		OpenCV.loadLocally();
	}

}
