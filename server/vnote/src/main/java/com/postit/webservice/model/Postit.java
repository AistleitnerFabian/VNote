package com.postit.webservice.model;

public class Postit {
    private double x;
    private double y;
    private String color;

    public Postit(double x, double y, String color){
        setColor(color);
        setX(x);
        setY(y);
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
        if(color == ""){
            this.color = "#FFC0CB";
        }else {
            this.color = color;
        }
    }
}
