package com.server.vnote.vnote;

import com.server.vnote.vnote.model.Wall;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import recognition.PostitRecognition;

@RestController
public class VnoteController {
    
    @GetMapping("/test")
    public String testServer(){
        return "server works";
    }

    @PostMapping("/recognize")
    public Wall recognize(@RequestBody String imagePath){
        String staticPath = "src/main/resources/static/" + imagePath;
        PostitRecognition pr = new PostitRecognition();
        Wall w = pr.recognize(staticPath);
        return w;
    }

    @PostMapping("uploadImage")
    public String upload(@RequestParam("file") MultipartFile img){ return ""; }
}
