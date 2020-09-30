package vNote.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vNote.model.Image;

import java.util.List;

public interface ImageRepository extends MongoRepository<Image, String> {
    public List<Image> findAll();
}
