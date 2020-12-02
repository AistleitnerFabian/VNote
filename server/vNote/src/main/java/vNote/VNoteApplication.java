package vNote;

import com.google.api.gax.paging.Page;
import io.grpc.Context;
import io.opencensus.metrics.export.Distribution;
import nu.pattern.OpenCV;
import org.opencv.core.Core;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableScheduling
@SpringBootApplication
public class VNoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(VNoteApplication.class, args);
		OpenCV.loadLocally();
	}
}
