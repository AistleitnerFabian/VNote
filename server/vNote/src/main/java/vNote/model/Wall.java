package vNote.model;

import java.util.List;

public class Wall {
    private String imgPath;
    private int numberOfPostits;
    private List<Postit> postits;
    private double imgWidth;
    private double imgHeight;

    public Wall(String imgPath, int numberOfPostits, List<Postit> postits, double imgWidth, double imgHeight){
        setImgPath(imgPath);
        setNumberOfPostits(numberOfPostits);
        setPostits(postits);
    }

    public void setImgWidth(double imgWidth){
        this.imgWidth = imgWidth;
    }

    public double getImgWidth(){
        return this.imgWidth;
    }

    public void setImgHeight(double imgHeight){
        this.imgHeight = imgHeight;
    }

    public double getImgHeight(){
        return this.imgHeight;
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
