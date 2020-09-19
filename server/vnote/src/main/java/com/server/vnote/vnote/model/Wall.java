package com.server.vnote.vnote.model;

import java.util.*;

public class Wall {
    private String imgPath;
    private int numberOfPostits;
    private List<Postit> postits;

    public Wall(String imgPath, int numberOfPostits, List<Postit> postits){
        setImgPath(imgPath);
        setNumberOfPostits(numberOfPostits);
        setPostits(postits);
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public int getNumberOfPostits() {
        return numberOfPostits;
    }

    public void setNumberOfPostits(int numberOfPostits) {
        this.numberOfPostits = numberOfPostits;
    }

    public List<Postit> getPostits() {
        return postits;
    }

    public void setPostits(List<Postit> postits) {
        this.postits = postits;
    }
}