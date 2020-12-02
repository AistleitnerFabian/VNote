package vNote;

import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.Feature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gcp.vision.CloudVisionTemplate;
import org.springframework.core.io.ResourceLoader;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class VisionController {
   /* @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private CloudVisionTemplate cloudVisionTemplate;

    @GetMapping("/extractText")
    public ModelAndView extractText(String imageURL, ModelMap map){
        AnnotateImageResponse response = this.cloudVisionTemplate.analyzeImage(this.resourceLoader.getResource(""), Feature.Type.DOCUMENT_TEXT_DETECTION);

        List<EntityAnnotation> annotations = response.getLabelAnnotationsList();

        map.addAttribute("annotations", annotations);
        map.addAttribute("imageUrl", imageURL);
        return new ModelAndView("result", map);
    }*/
}
