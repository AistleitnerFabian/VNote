package vNote.recognition;

import vNote.model.Postit;
import vNote.model.Test;
import vNote.model.Wall;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfFloat;
import org.opencv.core.MatOfInt;
import org.opencv.imgproc.Imgproc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class ColorRecognition {
    private List<Postit> postits = new ArrayList<>();
    public ColorRecognition(){}

    public List<Postit> recognize(HashMap<Postit, Mat> hmap){

        for(Postit p : hmap.keySet()){
            Mat cropped = hmap.get(p);
            String color = this.recognize(cropped);
            p.setColor(color);
            this.postits.add(p);
        }

        return this.postits;
    }

    /**
     * Title: recognize
     * Parameters: Mat postit --> the cropped postit
     * Description: First this cropped postit is converted to a HSV-image, the HSV-image will be split into its channels
     *              and with this channels a histogram will be calculated. The function localMinMax calculates the local
     *              minima and maxima, with the help of this function you can get the local maximum for the hue value.
     *              This value represents the dominant color of the image.
     */
    public String recognize(Mat postit){
        String color = "";

        Mat hsv = new Mat();
        Imgproc.cvtColor(postit, hsv, Imgproc.COLOR_BGR2HSV);

        //split into Hue, Saturation, Value
        List<Mat> hsvPlanes = new ArrayList<>();
        Core.split(hsv, hsvPlanes);

        int histSize = 256;
        MatOfFloat histRange = new MatOfFloat(0, 256);

        Mat hHist = new Mat();

        //calculate the histogram for Hue
        Imgproc.calcHist(hsvPlanes, new MatOfInt(0), new Mat(), hHist, new MatOfInt(histSize), histRange, false);

        Core.MinMaxLocResult c = Core.minMaxLoc(hHist);
        color = this.getColor((int) c.maxLoc.y);

        return color;
    }

    private String getColor(int H){
        String color;
        if (H < 14)
            color = "cRED";
        else if (H < 25)
            color = "cORANGE";
        else if (H < 34)
            color = "cYELLOW";
        else if (H < 73)
            color = "cGREEN";
        else if (H < 102)
            color = "cAQUA";
        else if (H < 127)
            color = "cBLUE";
        else if (H < 149)
            color = "cPURPLE";
        else if (H < 175)
            color = "cPINK";
        else    // full circle
            color = "cRED"; // back to Red
        return color;
    }
}
