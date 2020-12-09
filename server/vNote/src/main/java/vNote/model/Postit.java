package vNote.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Postit {
    @Id
    private String id;

    private double x;
    private double y;
    private String color;
    private Text text;

    public Postit(double x, double y, String color, Text text){
        setColor(color);
        setX(x);
        setY(y);
        setText(text);
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
            this.color = "#FFC0CB";
        }else {
            this.color = color;
        }
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
