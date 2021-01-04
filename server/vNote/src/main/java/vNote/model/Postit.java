package vNote.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Postit {
    @Id
    private String id;

    private String boardId;

    private double x;
    private double y;
    private String color;
    private Text text;
    private String notepadText;

    public Postit(String boardId, double x, double y, String color, Text text, String notepadText){
        setBoardId(boardId);
        setColor(color);
        setX(x);
        setY(y);
        setText(text);
        setNotepadText(notepadText);
    }

    public void setText(Text text){ this.text = text; }
    public Text getText(){ return this.text; }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        if(color.equals("")){
            this.color = "cPINK";
        }else {
            this.color = color;
        }
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public String getNotepadText() {
        return notepadText;
    }

    public void setNotepadText(String notepadText) {
        this.notepadText = notepadText;
    }

    @Override
    public String toString() {
        return "Postit{" +
                "id='" + id + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", color='" + color + '\'' +
                ", text='" + text + '\'' +
                '}';
    }
}
