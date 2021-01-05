package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;


@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    //Websocket Broadcast
    public void update(String payload) {
        this.template.convertAndSend("/app", payload);
    }


    //Websocket Broadcast
    public void updateNote(String boardId,String noteId, String cid) {
        this.template.convertAndSend("/"+boardId, noteId+";"+cid);
    }
}