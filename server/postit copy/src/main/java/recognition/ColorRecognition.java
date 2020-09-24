package recognition;

import org.opencv.core.*;
import org.opencv.imgcodecs.*;
import org.opencv.imgproc.*;

import java.util.*;

import com.postit.webservice.model.*;

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

    private String recognize(Mat postit){
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
