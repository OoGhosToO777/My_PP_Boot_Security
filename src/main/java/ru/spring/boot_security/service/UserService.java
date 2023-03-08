package ru.spring.boot_security.service;

import ru.spring.boot_security.model.User;

import java.util.List;

public interface UserService {

    List<User> showAllUsers();

    User showUser(int id);

    void saveUser(User user);

    void updateUser(int id, User updatedUser);

    void deleteUser(int id);

    User findUserByUsername(String userName);
}
