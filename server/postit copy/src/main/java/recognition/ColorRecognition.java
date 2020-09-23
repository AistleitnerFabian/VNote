package recognition;

import org.opencv.core.*;
import org.opencv.imgcodecs.*;
import org.opencv.imgproc.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ColorRecognition {

    public ColorRecognition(){}
/*
    public void cluster(Mat img){
        //convert to 32f
        Mat image32f = new Mat();
        img.convertTo(image32f, CvType.CV_32F);

        Mat labels = new Mat();
        TermCriteria criteria = new TermCriteria(TermCriteria.COUNT, 100, 1);
        Mat centers = new Mat();
        Core.kmeans(image32f, 1, labels, criteria, 1, Core.KMEANS_PP_CENTERS, centers);

        centers.convertTo(centers, CvType.CV_8UC1, 255.0);
        centers.reshape(3);

        List<Mat> clusters = new ArrayList<>();
        for(int i = 0; i < centers.rows(); i++){
            clusters.add(Mat.zeros(img.size(), img.type()));
        }

        Map<Integer, Integer> counts = new HashMap<Integer, Integer>();
        for(int i = 0; i < centers.rows(); i++) counts.put(i, 0);

        int rows = 0;
        for(int y = 0; y < img.rows(); y++) {
            for(int x = 0; x <img.cols(); x++) {
                int label = (int)labels.get(rows, 0)[0];
                int r = (int)centers.get(label, 2)[0];
                int g = (int)centers.get(label, 1)[0];
                int b = (int)centers.get(label, 0)[0];
                counts.put(label, counts.get(label) + 1);
                clusters.get(label).put(y, x, b, g, r);
                rows++;
            }
        }
        System.out.println(counts);

        //System.out.println("l: " + label + ", r: " + r + ", g: " + g + ", b. " + b);
    }*/

    public void cluster(Mat src){
        //convert to rgb
        Imgproc.cvtColor(src, src, Imgproc.COLOR_BGR2GRAY);

        //src.reshape(1,3);

        Mat labels = new Mat();
        Mat centers = new Mat();
        TermCriteria criteria = new TermCriteria(TermCriteria.COUNT, 100, 1);

        Mat clt = Core.kmeans(src, 3, labels, );
    }
}
