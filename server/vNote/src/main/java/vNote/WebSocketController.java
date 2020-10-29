package vNote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;


@Controller
public class WebSocketController {

    @Autowired
    private SimpMessagingTemplate template;

    //Websocket Broadcast
    //Scheduler is grod nur zum testen!
    @Scheduled(fixedRate = 2000)
    public void fireGreeting() {
        System.out.println("Fire");
        this.template.convertAndSend("/app", "test-payload");
    }
}