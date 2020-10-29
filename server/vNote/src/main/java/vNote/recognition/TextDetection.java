package vNote.recognition;

import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.List;

public class TextDetection {
    public TextDetection(){}

    public Mat detect(Mat postit, String c){
        List<Mat> channels = new ArrayList<>();
        Core.split(postit, channels);
        Mat channel;
        if(c.equals("cPINK") || c.equals("cORANGE")){  //switch instead
            channel = channels.get(2);
        }else{
            channel = channels.get(1);
        }

        Mat dst = channel.clone();
        Imgproc.threshold(channel, dst, 0, 255, Imgproc.THRESH_BINARY + Imgproc.THRESH_OTSU);

        Mat connected = new Mat();
        Mat morphKernel = Imgproc.getStructuringElement(Imgproc.MORPH_ELLIPSE, new Size(23,7));
        Imgproc.morphologyEx(dst, connected, Imgproc.MORPH_CLOSE, morphKernel);

        Mat paddingImage = new Mat();
        double paddingWidth = Math.floor(postit.width() * 0.1);
        double paddingHeight = Math.floor(postit.height() * 0.15);
        Rect roi = new Rect(new Point(paddingWidth, paddingHeight), new Point(postit.width()-paddingWidth, postit.height() - paddingHeight));
        paddingImage = dst.submat(roi);

        this.convertToBase64(paddingImage);

        return paddingImage;
    }

    private void convertToBase64(Mat paddingImage){
    }
}
