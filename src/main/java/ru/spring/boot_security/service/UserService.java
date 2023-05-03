package ru.spring.boot_security.service;

import ru.spring.boot_security.model.User;

import java.util.List;

public interface UserService {

    List<User> showAllUsers();

    User showUser(Integer id);

    void saveUser(User user);

    void updateUser(Integer id, User updatedUser);

    void deleteUser(Integer id);

    User findUserByUsername(String userName);
}
