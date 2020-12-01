package vNote.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import vNote.model.Postit;
import vNote.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public Optional<User> findByEmail(String email);
    public Optional<User> findById(String id);
}