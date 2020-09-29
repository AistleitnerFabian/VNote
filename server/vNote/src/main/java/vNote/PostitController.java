package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import vNote.model.Postit;
import vNote.model.Test;
import vNote.model.Wall;
import vNote.recognition.PostitRecognition;

import java.util.List;

@RestController
public class PostitController implements CommandLineRunner {

    @Autowired
    private PostitRepository postitRepository;

    @Override
    public void run(String... args) throws Exception {
        postitRepository.deleteAll();

        // save a couple of customers
        postitRepository.save(new Postit(0, 100, "RED"));
        postitRepository.save(new Postit(380, 1337, "GREEN"));
    }

    @GetMapping("/test")
    public Test testServer(){
        return new Test("maja");
    }


    @GetMapping("/findAllPostits")
    public List<Postit> findAllPostits(){
        return postitRepository.findAll();
    }

    @PostMapping("/recognize")
    public Wall recognize(@RequestBody String imagePath) {
        String staticPath = "src/main/resources/static/" + imagePath;
        //System.out.println(staticPath);

        PostitRecognition pr = new PostitRecognition();
        Wall w = pr.recognize(staticPath);

        return w;
    }

    @PostMapping("/uploadImage")
    public String upload(@RequestParam("file") MultipartFile img){
        return "";
    }


}
