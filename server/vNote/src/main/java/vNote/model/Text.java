package vNote.model;

public class Text {
    private String text;
    private String textImage;
    private boolean hasText;
    private int x;
    private int y;

    public Text(){}

    public Text(String text, String textImage, boolean hasText, int x, int y){
        this.setTextImage(textImage);
        this.setX(x);
        this.setY(y);
        this.setText(text);
        this.setHasText(hasText);
    }

    public String getTextImage() {
        return textImage;
    }

    public void setTextImage(String textImage) {
        this.textImage = textImage;
    }

    private void setY(int y) { this.y = y; }

    public void setX(int x){
        this.x = x;
    }

    public void setText(String text){
        this.text = text;
    }

    public String getText(){
        return this.text;
    }

    public boolean isHasText() {
        return hasText;
    }

    public void setHasText(boolean hasText) {
        this.hasText = hasText;
    }

    public int getX(){ return this.x; }

    public int getY(){ return this.y; }

    @Override
    public String toString() {
        return "Text{" +
                "text='" + text + '\'' +
                "image='" + textImage + '\'' +
                ", hasText=" + hasText +
                ", x=" + x +
                ", y=" + y +
                '}';
    }
}
