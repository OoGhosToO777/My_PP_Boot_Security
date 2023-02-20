package ru.spring.boot_security.dao;

import ru.spring.boot_security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
