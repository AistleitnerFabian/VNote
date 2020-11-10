package vNote.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vNote.model.Board;

import java.util.List;

public interface BoardRepository extends MongoRepository<Board, String> {
    public List<Board> findAll();
}
