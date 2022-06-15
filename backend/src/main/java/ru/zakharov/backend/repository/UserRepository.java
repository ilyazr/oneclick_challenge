package ru.zakharov.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ru.zakharov.backend.domain.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, Integer> {

    Optional<User> findUserByUsername(String username);

}
