package ru.spring.boot_security.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.spring.boot_security.model.Role;
import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.RoleService;
import ru.spring.boot_security.service.UserService;

import java.security.Principal;
import java.util.List;

@RequestMapping
@RestController
public class RestUsersController {

    private final UserService userService;

    private final RoleService roleService;

    public RestUsersController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(path = "/users")
    public List<User> showAllUsers() {
        return userService.showAllUsers();
    }

    @GetMapping(path = "/roles")
    public List<Role> showAllRoles() {
        return roleService.showAllRoles();
    }

    @GetMapping("/user/auth")
    public User index(Principal principal) {
        return userService.findUserByUsername(principal.getName());
    }

    @GetMapping(path = "/users/{id}")
    public User showOneUser(@PathVariable Integer id) {
        return userService.showUser(id);
    }

    @PostMapping(path = "/users")
    public User addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping(path = "/users")
    public User updateUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @DeleteMapping(path = "/users/{id}")
    public boolean deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
        return true;
    }

}
