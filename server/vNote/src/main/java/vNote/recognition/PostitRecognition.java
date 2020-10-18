package vNote.recognition;

import vNote.model.Postit;
import vNote.model.Test;
import vNote.model.Wall;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.core.CvType;
import org.opencv.core.Mat;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;

public class PostitRecognition {
    private Mat originalImage;
    private List<Rect> rects = new ArrayList<>();
    private List<Postit> postits = new ArrayList<>();
    List<Mat> croppedPostits = new ArrayList<>();

    HashMap<Postit, Mat> hmap = new HashMap<Postit, Mat>();

    public PostitRecognition() {
    }

    public void recognizeBase64Image(String base64Image) throws UnsupportedEncodingException {
        //decode base64
        try {
            byte[] bytes = Base64.getDecoder().decode(base64Image);
            Mat src = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_UNCHANGED);

            if (src.empty()) {
                System.out.println("image is empty");
            } else {
                Wall w = this.recognizePostits(src);
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }

    }

    private Wall recognizePostits(Mat src) {
        System.out.println("recognizing...");
        this.originalImage = src.clone(); //load image

        Mat hsv = new Mat();
        Imgproc.cvtColor(src, hsv, Imgproc.COLOR_BGR2HSV); //convert to hsv

        Mat s = this.getSaturation(hsv); //extract the Saturation channel from the hsv image

        Mat edges = this.performOtsu(s);//perform Otsu Algorithm for edge detection

        this.postits = this.findPostits(edges);//draw boundings in original image to see which postits where recognized

        //crop the postits for color recognition
        //this.cropPostits(this.originalImage);

        ColorRecognition cr = new ColorRecognition();
        this.postits = cr.recognize(hmap);

        Wall w = new Wall("filename", postits.size(), postits);

        return w; //postit wall
    }

    public Wall recognize(String filename) {
        Mat src = Imgcodecs.imread(filename);
        if (src.empty()) {
            System.out.println("leeeeeeeer");
            return null;
        } else {
            Wall w = recognizePostits(src);

            return w; //postit wall
        }
    }

    private List<Postit> findPostits(Mat src) {
        List<Postit> foundPostits = new ArrayList<>();
        int counter = 0;
        Mat dst = this.originalImage.clone(); //image where the rectangles (found postits) will be drawn in

        //find contours
        List<MatOfPoint> contours = new ArrayList<MatOfPoint>();
        //Mat image32s = new Mat();
        //src.convertTo(image32s, CvType.CV_32SC1);
        Imgproc.findContours(src, contours, new Mat(), Imgproc.RETR_LIST, Imgproc.CHAIN_APPROX_SIMPLE);

        //draw the contours on the image with colors
        Mat mask = Mat.zeros(src.size(), src.type());
        MatOfPoint2f approxCurve = new MatOfPoint2f();

        for (int i = 0; i < contours.size(); i++) {
            MatOfPoint2f contour2f = new MatOfPoint2f(contours.get(i).toArray());
            double approxDistance = Imgproc.arcLength(contour2f, true) * 0.01;
            Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);

            MatOfPoint points = new MatOfPoint(approxCurve.toArray());

            Rect rect = Imgproc.boundingRect(points);

            if (rect.width < 1000 && rect.height < 1000 && rect.width > 30 && rect.height > 30) {
                System.out.println(rect.width + ", " + rect.height);
                Postit p = new Postit(rect.x, rect.y, "");
                counter++;
                rects.add(rect);
                foundPostits.add(p);
                Mat cropped = this.originalImage.submat(rect);
                this.croppedPostits.add(cropped);
                this.hmap.put(p, cropped);
                Imgproc.rectangle(dst, rect.tl(), rect.br(), new Scalar(0, 0, 0), 10);
            }
        }
        System.out.println("found: " + counter);
        return foundPostits;
    }

    private Mat performOtsu(Mat src) {
        Mat dst = src.clone();
        Imgproc.threshold(src, dst, 0, 255, Imgproc.THRESH_BINARY_INV + Imgproc.THRESH_OTSU);
        return dst;
    }

    private Mat getSaturation(Mat hsv) {
        List<Mat> channels = new ArrayList<>();
        Core.split(hsv, channels);
        Mat s = channels.get(1);
        return s;
    }

    private void cropPostits(Mat src) {

        for (Rect r : rects) {
            this.croppedPostits.add(src.submat(r));
        }

        //save cropped postits
        //this.saveCroppedPostits();
    }

    private void saveCroppedPostits() {
        int counter = 0;
        for (Mat p : this.croppedPostits) {
            this.write(p, "p" + counter);
            counter++;
        }
    }

    private void write(Mat src, String filename) {
        String dir = "src/main/resources/colorRecognition/";
        Imgcodecs.imwrite(dir + filename + ".jpg", src);
    }
}
