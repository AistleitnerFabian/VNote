package vNote.recognition;

import org.bson.internal.Base64;
import org.opencv.core.*;
import org.opencv.highgui.HighGui;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.List;

public class TextDetection {
    public TextDetection(){}

    public String detect(Mat postit, String c){

        Imgproc.cvtColor(postit, postit, Imgproc.COLOR_BGR2GRAY);

        Mat paddingImage;
        double paddingWidth = Math.floor(postit.width() * 0.1);
        double paddingHeight = Math.floor(postit.height() * 0.15);
        Rect roi = new Rect(new Point(paddingWidth, paddingHeight), new Point(postit.width()-paddingWidth, postit.height() - paddingHeight));
        paddingImage = postit.submat(roi);

        Mat dst = new Mat();
        Core.inRange(paddingImage, new Scalar(0,0,0), new Scalar(70, 70, 70), dst);

        Core.bitwise_not(dst, dst);

        Mat morphKernel = Imgproc.getStructuringElement(Imgproc.MORPH_ELLIPSE, new Size(5,3));
        Imgproc.morphologyEx(dst, dst, Imgproc.MORPH_OPEN, morphKernel);

        return this.convertToBase64(dst);
    }

    private String convertToBase64(Mat paddingImage){
        MatOfByte bytes = new MatOfByte();
        Imgcodecs.imencode(".jpg", paddingImage, bytes);
        return Base64.encode(bytes.toArray());
    }

    private void write(Mat src, String filename) {
        String dir = "src/main/resources/static/textRecognition/";
        Imgcodecs.imwrite(dir + filename + ".jpg", src);
    }
}
