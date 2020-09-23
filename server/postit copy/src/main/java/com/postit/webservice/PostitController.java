package com.postit.webservice;

import com.postit.webservice.model.Test;
import com.postit.webservice.model.Wall;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import recognition.PostitRecognition;

@RestController
public class PostitController {

    @GetMapping("/test")
    public Test testServer(){
        return new Test("maja");
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
