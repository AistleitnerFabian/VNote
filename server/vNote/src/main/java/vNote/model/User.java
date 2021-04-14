package vNote.model;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.List;

@Document
public class User {
    @Id
    private String id;

    @Size(min=1, max=100)
    private String firstname;

    @Size(min=1, max=100)
    private String lastname;

    @Email
    private String email;

    @Size(min=1, max=100)
    private String password;

    private String[] notifications;

    private Board[] boards;

    public User(String id, String firstname, String lastname,String email , String password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.notifications = new String[5];
        this.boards = new Board[3];
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String[] getNotifications() {
        return notifications;
    }
    public Board[] getBoards() {
        return boards;
    }

    public void addNotifications(String message){
        this.notifications = ArrayUtils.add(this.notifications, 0, message);
    }
    public void addBoard(Board newBoard){
        if(boards[0] == null || boards[0].getId() != newBoard.getId()) {
            // shift right
            for (int index = boards.length - 2; index >= 0; index--) {
                boards[index + 1] = boards[index];
            }
            // wrap last element into first slot
            boards[0] = newBoard;
        }
    }
}
