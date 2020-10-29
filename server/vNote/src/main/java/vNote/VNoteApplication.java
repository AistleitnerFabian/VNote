package vNote;

import nu.pattern.OpenCV;
import org.opencv.core.Core;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class VNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(VNoteApplication.class, args);
		//OpenCV.loadLocally();
	}

}
