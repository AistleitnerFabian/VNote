package vNote.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Board {

    @Id
    private String id;

    private String userId;
    private List<String> contributors;
    private String boardName;
    private String imgPath;
    private int numberOfPostits;
    private double imgWidth;
    private double imgHeight;

    public Board(){}

    public Board(String id, String userId,List<String> contributors, String boardName, String imgPath, int numberOfPostits, double imgWidth, double imgHeight) {
        setId(id);
        setUserId(userId);
        setContributors(contributors);
        setBoardName(boardName);
        setImgPath(imgPath);
        setNumberOfPostits(numberOfPostits);
        setImgWidth(imgWidth);
        setImgHeight(imgHeight);
    }

    public String getBoardName() {
        return boardName;
    }

    public void setBoardName(String boardName) {
        this.boardName = boardName;
    }

    public List<String> getContributors() {
        return contributors;
    }

    public void addContributors(String contributor) {
        this.contributors.add(contributor);
    }

    public void setContributors(List<String> contributors) {
        this.contributors = contributors;
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
