package vNote.model;

public class Text {
    private String text;

    public Text(String text){
        this.setText(text);
    }

    public void setText(String text){
        this.text = text;
    }

    public String getText(){
        return this.text;
    }
}
