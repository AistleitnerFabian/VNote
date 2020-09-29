package vNote;

import nu.pattern.OpenCV;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(VNoteApplication.class, args);
		OpenCV.loadLocally();
	}

}
