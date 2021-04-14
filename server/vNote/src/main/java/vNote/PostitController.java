package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vNote.model.*;
import vNote.recognition.PostitRecognition;
import vNote.repositories.BoardRepository;
import vNote.repositories.ImageRepository;
import vNote.repositories.PostitRepository;
import vNote.repositories.UserRepository;

import java.io.*;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args){
        //System.loadLibrary(Core.NATIVE_LIBRARY_NAME);

        postitRepository.deleteAll();
        imageRepository.deleteAll();

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

    @GetMapping("test")
    public String testServer(){
        return "server works";
    }


    @GetMapping("findAllPostits")
    public List<Postit> findAllPostits(){
        return postitRepository.findAll();
    }

    @GetMapping("findAllBoards")
    public List<Board> findAllBoards(){
        return boardRepository.findAll();
    }

    @GetMapping("findBoardsByUserId/{uid}")
    public List<Board> findBoardsByUserId(@PathVariable String uid){
        return boardRepository.findAll().stream()
                .filter(board -> {
                    if(board.getContributors() == null){
                        board.setContributors(new LinkedList<>());
                    }
                    return board.getUserId().equals(uid) || board.getContributors().contains(uid);
                })
                .collect(Collectors.toList());
    }

    @GetMapping("findBoardById/{bid}")
    public Board findAllBoards(@PathVariable String bid){
        return boardRepository.findBoardById(bid);
    }

    @GetMapping("findNotesByBoardId/{bid}")
    public List<Postit> findNotesByBoardId(@PathVariable String bid){
        return postitRepository.findByBoardId(bid);
    }

    @PutMapping("updateNote/{cid}")
    public Postit updateNote(@PathVariable String cid, @RequestBody Postit postit){
        Postit p = postitRepository.save(postit);
        webSocketController.updateNote(postit.getBoardId(), postit.getId(), cid);
        return p;
    }

    @PostMapping("deleteNote/{cid}")
    public Postit deleteNote(@PathVariable String cid, @RequestBody Postit postit){
        postitRepository.deleteById(postit.getId());
        webSocketController.updateNote(postit.getBoardId(), postit.getId(), cid);
        return postit;
    }

    @PutMapping("updateBoard")
    public Board updateBoard(@RequestBody Board board){
        if(board.getId() != null) {
            Optional<Board> optionalBoard = boardRepository.findById(board.getId());
            if (optionalBoard.isPresent()) {
                Board oldBoard = optionalBoard.get();

                int oldBoardSize;
                if (oldBoard.getContributors() != null) {
                    oldBoardSize = oldBoard.getContributors().size();
                } else {
                    oldBoardSize = 0;
                }

                int boardSize;
                if (board.getContributors() != null) {
                    boardSize = board.getContributors().size();
                } else {
                    boardSize = 0;
                }
                if (oldBoardSize < boardSize) {
                    var optUser = userRepository.findById(board.getUserId());
                    if (optUser.isPresent()) {
                        var user = optUser.get();
                        user.addNotifications("A contributor has joined your board!");
                        userRepository.save(user);
                    }
                }
            }
        }
        Board b = boardRepository.save(board);
        webSocketController.update("updateBoards");
        return b;
    }


    @GetMapping("getNoteById/{nid}")
    public Postit getNoteById(@PathVariable String nid){
        Optional<Postit> postit = postitRepository.findById(nid);
        return postit.orElse(null);
    }

    @GetMapping("findAllImages")
    public List<Image> findAllImages(){
        return imageRepository.findAll();
    }

    @PostMapping("updateLatest")
    public User updateLatest(@RequestBody String args){
        String[] splitArgs = args.split(";");
        String userId = splitArgs[0];
        String boardId = splitArgs[1];
        var optUser = userRepository.findById(userId);
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        if(optionalBoard.isPresent()) {
            Board board = optionalBoard.get();
            if (optUser.isPresent()) {
                var user = optUser.get();
                user.addBoard(board);
                userRepository.save(user);
            }
        }

        return null;
    }

    @PostMapping("recognize")
    public Board recognize(@RequestBody String imagePath) {
        String staticPath = "src/main/resources/static/" + imagePath;
        System.out.println(staticPath);

        PostitRecognition pr = new PostitRecognition();
        return pr.recognize(staticPath);
    }

    @PostMapping(path = "uploadImage", consumes = "application/json")
    public imageDataDTO uploadImage(@RequestBody imageDataDTO imgDTO) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmail(imgDTO.user.getEmail());
        if(optionalUser.isPresent()) {
            User userObj = optionalUser.get();
            if (passwordEncoder.matches(imgDTO.user.getPassword(), userObj.getPassword())) {
                System.out.println("userid: " + userObj.getId());
                PostitRecognition pr = new PostitRecognition();
                Board b = pr.recognizeBase64Image(imgDTO.base64Image);
                List<Postit> postits = pr.getPostits();
                b.setUserId(userObj.getId());
                System.out.println(b.getUserId());
                b = boardRepository.save(b);
                for(Postit postit : postits){
                    postit.setBoardId(b.getId());
                    postitRepository.save(postit);
                }
                var optUser = userRepository.findById(imgDTO.user.getId());
                if(optUser.isPresent()){
                    var user = optUser.get();
                    user.addNotifications("An image has been uploaded!");
                    userRepository.save(user);
                }
                webSocketController.update("updateBoards");
                return imgDTO;
            }
        }
        return null;
    }

    @PostMapping(path = "uploadImageWeb", consumes = "application/json")
    public imageDataDTO uploadImageWeb(@RequestBody imageDataDTO imgDTO) throws Exception {
                System.out.println(imgDTO.base64Image);
                System.out.println("userid: " + imgDTO.user.getId());
                PostitRecognition pr = new PostitRecognition();
                Board b = pr.recognizeBase64Image(imgDTO.base64Image);
                List<Postit> postits = pr.getPostits();
                b.setUserId(imgDTO.user.getId());
                System.out.println(b.getUserId());
                b = boardRepository.save(b);
                for(Postit postit : postits){
                    postit.setBoardId(b.getId());
                    postitRepository.save(postit);
                }
                var optUser = userRepository.findById(imgDTO.user.getId());
                if(optUser.isPresent()){
                    var user = optUser.get();
                    user.addNotifications("An image has been uploaded!");
                    userRepository.save(user);
                }
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
