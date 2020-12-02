package vNote.recognition;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class TextRecognition {
    public static String detectText(String p) throws Exception, IOException{

        String dir = "src/main/resources/static/textRecognition/"+p+".jpg";

        //byte[] b = new byte[(int) (src.total() * src.channels())];
        //src.get(0, 0, b);

        String text = "";
        //AIzaSyAz6OlANQZ2atDWRCZZ3DpBMbnaNBGvrDY
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(new FileInputStream(dir));
        //ByteString imgBytes = ByteString.copyFrom(b);

        Image img = Image.newBuilder().setContent(imgBytes).build();

        //mage image = Image.newBuilder().setSource(img).build();

        Feature feature = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(img).build();
        requests.add(request);

        AnnotateImageResponse visionResponse = null;
        try(ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            visionResponse = client.batchAnnotateImages(requests).getResponses(0);

            if(visionResponse == null || !visionResponse.hasFullTextAnnotation()){
                System.out.println("no text");
                return "";
            }

            if(visionResponse.hasError()){
                System.err.println(visionResponse.getError());
                return "";
            }
        }catch(Exception e){
            System.err.print(e.getMessage());
        }

        text = visionResponse.getFullTextAnnotation().getText();
        System.out.println(text);


        return text;
    }
}
