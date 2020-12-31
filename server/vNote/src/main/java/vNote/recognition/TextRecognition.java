package vNote.recognition;

import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import vNote.model.Text;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

public class TextRecognition {
    public static Text recognizeText(String p) throws Exception{

        String dir = "src/main/resources/static/textRecognition/"+p+".jpg";

        Text text;
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(new FileInputStream(dir));

        Image img = Image.newBuilder().setContent(imgBytes).build();

        Feature feature = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(img).build();
        requests.add(request);

        AnnotateImageResponse visionResponse;
        try(ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            visionResponse = client.batchAnnotateImages(requests).getResponses(0);

            System.out.println(visionResponse.getFullTextAnnotation()
                    .getPages(0)
                    .getBlocks(0)
                    .getBoundingBox()
                    .getVertices(0)
                    .getX());


            BoundingPoly block = visionResponse.getFullTextAnnotation()
                    .getPages(0)
                    .getBlocks(0)
                    .getBoundingBox();

            if(visionResponse.equals(null) || !visionResponse.hasFullTextAnnotation()){
                System.out.println("no text");

                return new Text(null, null, false, 0, 0);
            }

            if(visionResponse.hasError()){
                System.err.println("Error at visionResponse: " + visionResponse.getError());
                return new Text("","", false, 0, 0);
            }
        }catch(Exception e){
            System.err.print("Error at try catch: " + e.getMessage());
            deleteImages();
            return new Text(null, "", false, 0, 0);
        }

        int x = visionResponse.getFullTextAnnotation()
                .getPages(0)
                .getBlocks(0)
                .getBoundingBox()
                .getVertices(0)
                .getX();
        int y = visionResponse.getFullTextAnnotation()
                .getPages(0)
                .getBlocks(0)
                .getBoundingBox()
                .getVertices(0)
                .getY();

        text = new Text(visionResponse.getFullTextAnnotation().getText(),"", true, x, y);

        deleteImages();

        return text;
    }

    private static void deleteImages() {
        File folder = new File( "src/main/resources/static/textRecognition");
        for(File file : folder.listFiles()){
            if (!file.isDirectory()) {
                file.delete();
            }
        }
    }
}
