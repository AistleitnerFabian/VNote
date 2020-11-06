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
    private String textImage;

    public Postit(double x, double y, String color, String textImage){
        setColor(color);
        setX(x);
        setY(y);
        setTextImage(textImage);
    }

    public void setTextImage(String textImage){
        this.textImage = textImage;
    }
    public String getTextImage(){
        return this.textImage;
    }

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
}
