package vNote.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Board {

    @Id
    private String id;

    private String userId;

    private String imgPath;
    private int numberOfPostits;
    private List<Postit> postits;
    private double imgWidth;
    private double imgHeight;

    public Board(){}

    public Board(String id, String userId, String imgPath, int numberOfPostits, List<Postit> postits, double imgWidth, double imgHeight) {
        setId(id);
        setUserId(userId);
        setImgPath(imgPath);
        setNumberOfPostits(numberOfPostits);
        setPostits(postits);
        setImgWidth(imgWidth);
        setImgHeight(imgHeight);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public double getImgWidth() {
        return imgWidth;
    }

    public void setImgWidth(double imgWidth) {
        this.imgWidth = imgWidth;
    }

    public double getImgHeight() {
        return imgHeight;
    }

    public void setImgHeight(double imgHeight) {
        this.imgHeight = imgHeight;
    }
}
