package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.web.bind.annotation.*;
import vNote.model.*;
import vNote.recognition.PostitRecognition;
import vNote.repositories.BoardRepository;
import vNote.repositories.ImageRepository;
import vNote.repositories.PostitRepository;

import java.io.*;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
public class PostitController implements CommandLineRunner {

    @Autowired
    private PostitRepository postitRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private WebSocketController webSocketController;

    @Override
    public void run(String... args){
        //System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        postitRepository.deleteAll();
        imageRepository.deleteAll();

        postitRepository.save(new Postit(0, 100, "RED", new Text("","", false, 0, 0)));
        postitRepository.save(new Postit(380, 1337, "GREEN", new Text("","", false, 0, 0)));

        imageRepository.save(new Image(encoder("src/main/resources/static/badposition1.jpg"),
                LocalDateTime.now()));
        imageRepository.save(new Image(encoder("src/main/resources/static/badposition2.jpg"),
                LocalDateTime.now().plusDays(1)));

        //upload(encoder("src/main/resources/static/badposition2.jpg"));
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
    public String testServer(){
        return "server works";
    }


    @GetMapping("/findAllPostits")
    public List<Postit> findAllPostits(){
        return postitRepository.findAll();
    }

    @GetMapping("/findAllBoards")
    public List<Board> findAllBoards(){
        return boardRepository.findAll().stream().map(board -> {
            board.setPostits(new LinkedList<Postit>());
            return board;
        }).collect(Collectors.toList());
    }

    @GetMapping("/findBoardById/{bid}")
    public Board findAllBoards(@PathVariable String bid){
        return boardRepository.findBoardById(bid);
    }

    @GetMapping("/findAllImages")
    public List<Image> findAllImages(){
        return imageRepository.findAll();
    }


    @PostMapping("/recognize")
    public Board recognize(@RequestBody String imagePath) {
        String staticPath = "src/main/resources/static/" + imagePath;
        System.out.println(staticPath);

        PostitRecognition pr = new PostitRecognition();
        return pr.recognize(staticPath);
    }

    @PostMapping(path = "/uploadImage", consumes = "application/json")
    public imageDataDTO uploadImage(@RequestBody imageDataDTO imgDTO) throws Exception {
        System.out.println("userid: "+imgDTO.userId);
        PostitRecognition pr = new PostitRecognition();
        Board b;
        b = pr.recognizeBase64Image(imgDTO.base64Image);
        b.setUserId(imgDTO.userId);
        System.out.println(b.getUserId());
        boardRepository.save(b);
        webSocketController.update("updateBoards");
        return imgDTO;
    }

    public boolean IsBase64String(String s)
    {
        s = s.trim();
        String pattern = "@\"^[a-zA-Z0-9\\+/]*={0,3}$\"";
        return s.matches(pattern);

    }

}
