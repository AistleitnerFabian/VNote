package vNote.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import vNote.model.Board;
import vNote.model.Postit;

@Repository
public interface PostitRepository extends MongoRepository<Postit, String> {
    public List<Postit> findAll();
    public List<Postit> findByBoardId(String boardId);
}
