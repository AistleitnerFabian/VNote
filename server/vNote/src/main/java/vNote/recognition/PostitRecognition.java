package vNote.recognition;

import org.opencv.highgui.HighGui;
import vNote.model.Board;
import vNote.model.Postit;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.core.Mat;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

public class PostitRecognition {
    private Mat originalImage;
    private List<Postit> postits;
    private List<Mat> croppedPostits;
    private ColorRecognition colorRecognition;
    private TextDetection textDetection;
    private List<RotatedRect> rects;

    public PostitRecognition() {
        this.colorRecognition = new ColorRecognition();
        this.postits = new ArrayList<>();
        this.croppedPostits = new ArrayList<>();
        this.textDetection = new TextDetection();
    }

    public Board recognizeBase64Image(String base64Image) throws UnsupportedEncodingException {
        //decode base64
        try {
            byte[] bytes = Base64.getDecoder().decode(base64Image);
            Mat src = Imgcodecs.imdecode(new MatOfByte(bytes), Imgcodecs.IMREAD_UNCHANGED);

            if (src.empty()) {
                System.out.println("image is empty");
            } else {
                return this.recognizePostits(src);
            }
        } catch (Exception e) {
            System.out.println("Exception: " + e);
        }
        return null;
    }

    /**
     * Title: recognizePostits
     * Description: The Postits will be recognized in ... steps. The first step is to convert the image into HSV. This
     *              gives the possibility to extract the saturation-channel. In the next step on this saturation channel
     *              a threshold method will be applied. This method returns a matrices where the background is back and
     *              the postits are white (binarization). In the findPosits-method the postits will be find with help of
     *              OpenCV's built in findContours-method. The last step is to calculate the color of the postit.**/
    private Board recognizePostits(Mat src) {
        System.out.println("recognizing...");
        this.originalImage = src.clone(); //load image

        //Mat cntr = this.increaseContrast(src);

        Mat hsv = new Mat();
        Imgproc.cvtColor(src, hsv, Imgproc.COLOR_BGR2HSV); //convert to hsv

        Mat s = this.getSaturation(hsv); //extract the Saturation channel from the hsv image

        Mat edges = this.performOtsu(s);//perform Otsu Algorithm for edge detection

        this.postits = this.findPostits(edges);//draw boundings in original image to see which postits where recognized
System.out.print(this.postits.size());
        Board w = new Board("filename", postits.size(), postits, src.width(), src.height());

        return w; //postit wall
    }

    private Mat increaseContrast(Mat src) {
        Mat dst = new Mat(src.rows(), src.cols(), src.type());
        src.convertTo(dst, -1, 2, 0);
        return dst;
    }

    public Board recognize(String filename) {
        Mat src = Imgcodecs.imread(filename);
        if (src.empty()) {
            System.out.println("leeeeeeeer");
            return null;
        } else {
            return recognizePostits(src); //postit wall
        }
    }

    private List<Postit> findPostits(Mat src) {
        List<Postit> foundPostits = new ArrayList<>();
        Mat dst = this.originalImage.clone(); //image where the rectangles (found postits) will be drawn in
        Mat rotated;

        //find contours
        List<MatOfPoint> contours = new ArrayList<>();
        Imgproc.findContours(src, contours, new Mat(), Imgproc.RETR_LIST, Imgproc.CHAIN_APPROX_SIMPLE);

        //draw the contours on the image with colors
        MatOfPoint2f approxCurve = new MatOfPoint2f();

        RotatedRect[] minRect = new RotatedRect[contours.size()];

        for (int i = 0; i < contours.size(); i++) {
            MatOfPoint2f contour2f = new MatOfPoint2f(contours.get(i).toArray());
            double approxDistance = Imgproc.arcLength(contour2f, true) * 0.01;
            Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);

            MatOfPoint points = new MatOfPoint(approxCurve.toArray());

            Rect rect = Imgproc.boundingRect(points);
            minRect[i] = Imgproc.minAreaRect(new MatOfPoint2f(contours.get(i).toArray())); //rotated rect
            Point[] rectPoints = new Point[4];
            minRect[i].points(rectPoints);

            if (rect.width < 1000 && rect.height < 1000 && rect.width > 30 && rect.height > 30) {
                System.out.println(rect.width + ", " + rect.height);
                rotated = this.cropRotatedRect(minRect[i], points, dst);
                String color = this.colorRecognition.recognize(rotated);
                String txtImage = this.textDetection.detect(rotated, color);
                Postit p = new Postit(rect.x, rect.y, color, txtImage);
                //System.out.println(txtImage);
                foundPostits.add(p);
            }
        }

        System.out.println("found: " + foundPostits.size());
        return foundPostits;
    }

    private List<RotatedRect> checkFalsePostits(List<RotatedRect> rects) {
        List<RotatedRect> tmp = new ArrayList<>();
        tmp.addAll(rects);
        for(RotatedRect r: rects){
            for(int i = 0; i < rects.size(); i++){
                if(!r.equals(rects.get(i))){
                    if(r.boundingRect().tl().inside(rects.get(i).boundingRect()) && r.boundingRect().br()
                            .inside(rects.get(i).boundingRect())){
                        tmp.remove(r);
                    }
                }
            }
        }
        return tmp;
    }

    private Mat cropRotatedRect(RotatedRect rotatedRect, MatOfPoint points, Mat img) {
        Rect roi = Imgproc.boundingRect(points);
        Mat m = img.submat(roi);
        double angle = rotatedRect.angle;
        Size rect_size = rotatedRect.size;

        if (rotatedRect.angle < -45.) {
            angle += 90.0;
            //swap(rect_size.width, rect_size.height);
            double tmp = rect_size.width;
            rect_size.width = rect_size.height;
            rect_size.height = tmp;
        }

        Mat rot = Imgproc.getRotationMatrix2D(rotatedRect.center, angle, 1.0);
        double[] rot_0_2 = rot.get(0, 2);
        for (int i = 0; i < rot_0_2.length; i++) {
            rot_0_2[i] += rotatedRect.size.width / 2 - rotatedRect.center.x;
        }
        rot.put(0, 2, rot_0_2);
        double[] rot_1_2 = rot.get(1, 2);
        for (int i = 0; i < rot_1_2.length; i++) {
            rot_1_2[i] += rotatedRect.size.height / 2 - rotatedRect.center.y;
        }
        rot.put(1, 2, rot_1_2);
        Mat rotated = new Mat();
        Imgproc.warpAffine(img, rotated, rot, rotatedRect.size);
        return rotated;
    }

    private Mat performOtsu(Mat src) {
        Mat dst = src.clone();
        Imgproc.threshold(src, dst, 0, 255, Imgproc.THRESH_BINARY_INV + Imgproc.THRESH_OTSU);
        return dst;
    }

    private Mat getSaturation(Mat hsv) {
        List<Mat> channels = new ArrayList<>();
        Core.split(hsv, channels);
        return channels.get(1);
    }

    private void write(Mat src, String filename) {
        String dir = "src/main/resources/colorRecognition/";
        Imgcodecs.imwrite(dir + filename + ".jpg", src);
    }
}
