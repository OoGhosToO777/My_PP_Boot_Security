package ru.spring.boot_security.controller;

import org.springframework.web.bind.annotation.*;
import ru.spring.boot_security.model.Role;
import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.RoleService;
import ru.spring.boot_security.service.UserService;

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

    @GetMapping(path = "/users/{id}")
    public User showOneUser(@PathVariable int id) {
        return userService.showUser(id);
    }

    @PostMapping(path = "/users")
    public @ResponseBody User addNewUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @PutMapping(path = "/users")
    public @ResponseBody User updateUser(@RequestBody User user) {
        userService.saveUser(user);
        return user;
    }

    @DeleteMapping(path = "/users/{id}")
    public String deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
//        return String.format("User with ID = %f is deleted", id);
        return "Delete complete";
    }

}
