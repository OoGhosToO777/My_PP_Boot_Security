package ru.spring.boot_security.dao;

import org.springframework.stereotype.Repository;
import ru.spring.boot_security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserByUsername(String username);

}
