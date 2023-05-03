package ru.spring.boot_security.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.spring.boot_security.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
