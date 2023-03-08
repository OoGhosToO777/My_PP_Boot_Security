package ru.spring.boot_security.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import ru.spring.boot_security.dao.UserRepository;
import ru.spring.boot_security.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserServiceImpl implements UserService{

    private static final Logger LOGGER = Logger.getLogger("UserServiceImpl");

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> showAllUsers() {
        LOGGER.info("showAllUsers");
        return userRepository.findAll();
    }

    @Override
    public User showUser(int id) {
        LOGGER.info("showUser");
        return userRepository.findById(id).isPresent() ? userRepository.findById(id).get() : null;
    }

    @Override
    public void saveUser(User user) {
        LOGGER.info("saveUser");
        userRepository.save(user);
    }

    @Override
    public void updateUser(int id, User updatedUser) {
        LOGGER.info("updateUser");
        userRepository.save(updatedUser);
    }

    @Override
    public void deleteUser(int id) {
        LOGGER.info("deleteUser");
        userRepository.deleteById(id);
    }

    @Override
    public User findUserByUsername(String userName) {
        return userRepository.findUserByUsername(userName)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("User with user name: %s not found", userName)));
    }
}
