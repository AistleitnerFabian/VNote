package vNote;

import nu.pattern.OpenCV;
import org.opencv.core.Core;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vNote.model.Image;
import vNote.model.Postit;
import vNote.model.Test;
import vNote.model.Wall;
import vNote.recognition.PostitRecognition;
import vNote.repositories.ImageRepository;
import vNote.repositories.PostitRepository;

import java.io.*;
import java.security.cert.CollectionCertStoreParameters;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
public class PostitController implements CommandLineRunner {

    @Autowired
    private PostitRepository postitRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Override
    public void run(String... args) throws Exception {
        //System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
        OpenCV.loadLocally();
        postitRepository.deleteAll();
        imageRepository.deleteAll();

        postitRepository.save(new Postit(0, 100, "RED"));
        postitRepository.save(new Postit(380, 1337, "GREEN"));

        imageRepository.save(new Image(encoder("src/main/resources/static/badposition1.jpg"),
                LocalDateTime.now()));
        imageRepository.save(new Image(encoder("src/main/resources/static/badposition2.jpg"),
                LocalDateTime.now().plusDays(1)));

        upload(encoder("src/main/resources/static/badposition2.jpg"));
    }

    public static String encoder(String imagePath) {
        String base64Image = "";
        File file = new File(imagePath);
        try (FileInputStream imageInFile = new FileInputStream(file)) {
            // Reading a Image file from file system
            byte imageData[] = new byte[(int) file.length()];
            imageInFile.read(imageData);
            base64Image = Base64.getEncoder().encodeToString(imageData);
        } catch (FileNotFoundException e) {
            System.out.println("Image not found" + e);
        } catch (IOException ioe) {
            System.out.println("Exception while reading the Image " + ioe);
        }
        return base64Image;
    }

    @GetMapping("/test")
    public Test testServer(){
        return new Test("maja");
    }


    @GetMapping("/findAllPostits")
    public List<Postit> findAllPostits(){
        return postitRepository.findAll();
    }


    @GetMapping("/findAllImages")
    public List<Image> findAllImages(){
        return imageRepository.findAll();
    }


    @PostMapping("/recognize")
    public Wall recognize(@RequestBody String imagePath) {
        String staticPath = "src/main/resources/static/" + imagePath;
        //System.out.println(staticPath);

        PostitRecognition pr = new PostitRecognition();
        Wall w = pr.recognize(staticPath);

        return w;
    }

    @PostMapping("/uploadBase64Image")
    public void upload(@RequestBody String base64Image) throws UnsupportedEncodingException {
        imageRepository.save(new Image(base64Image, LocalDateTime.now()));

        PostitRecognition pr = new PostitRecognition();
        pr.recognizeBase64Image(base64Image);
    }

    @PostMapping("/uploadImage")
    public String uploadImage(@RequestBody String img){
        System.out.println("yeet");
        System.out.println(img);
        return "";
    }

}
