package vNote.recognition;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

public class TextRecognition {
    public static void detectText(String fielPath) throws Exception, IOException{
        //AIzaSyAz6OlANQZ2atDWRCZZ3DpBMbnaNBGvrDY
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(new FileInputStream(fielPath));

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try(ImageAnnotatorClient client = ImageAnnotatorClient.create()){
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for(AnnotateImageResponse res : responses){
                if(res.hasError()){
                    System.out.printf("Error: %s\n", res.getError().getMessage());
                    return;
                }

                for(EntityAnnotation annotation : res.getTextAnnotationsList()){
                    System.out.print(annotation.getDescription());
                }
            }
        }
    }
}
