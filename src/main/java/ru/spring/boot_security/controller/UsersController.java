package ru.spring.boot_security.controller;


import ru.spring.boot_security.model.User;
import ru.spring.boot_security.service.RoleService;
import ru.spring.boot_security.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Persistence;
import java.security.Principal;

@Controller
@RequestMapping("/")
public class UsersController {

    private final UserService userService;
    private final RoleService roleService;

    public UsersController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String index(Model model, @ModelAttribute("user") User user, Principal principal) {
        model.addAttribute("users", userService.showAllUsers());
        model.addAttribute("roles", roleService.showAllRoles());
        User userAuth = userService.findUserByUsername(principal.getName());
        boolean test = userAuth.getUserRoles().contains("ADMIN");
        boolean test2 = userAuth.getUserRoles().contains("ROLE_ADMIN");
        boolean test3 = userAuth.getUserRoles().contains("USER");
        boolean test4 = userAuth.getUserRoles().contains("ROLE_USER");
        System.out.println(test);
        System.out.println(test2);
        System.out.println(test3);
        System.out.println(test4);
        model.addAttribute("authenticationUser", userAuth);
        return "security";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin";
    }

    @GetMapping("/user")
    public String userPage(Model model, Principal principal) {
        model.addAttribute("users", userService.showAllUsers());
        User userAuth = userService.findUserByUsername(principal.getName());
        model.addAttribute("authenticationUser", userAuth);
        return "user";
    }

    @GetMapping("/{id}")
    public String show(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.showUser(id));
        return "users/show";
    }

    @GetMapping("/admin/{id}")
    public String showForAdmin(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.showUser(id));
        return "users/show";
    }

    @GetMapping("/admin/new")
    public String newUser(@ModelAttribute("user") User user) {
        return "users/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("user") User user,
                         BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            return "users/new";

        userService.saveUser(user);
        return "redirect:/";
    }

    @GetMapping("/admin/{id}/edit")
    public String edit(Model model, @PathVariable("id") int id) {
        model.addAttribute("user", userService.showUser(id));
        return "users/edit";
    }

    @PostMapping("/admin/delete/{id}")
    public String delete(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/";
    }

    @PostMapping("/{id}")
    public String update(@ModelAttribute("user") User user, BindingResult bindingResult,
                         @PathVariable("id") int id) {
        if (bindingResult.hasErrors())
            return "users/edit";

        userService.updateUser(id, user);
        return "redirect:/";
    }
}
