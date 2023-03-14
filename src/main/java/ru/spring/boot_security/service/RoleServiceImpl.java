package ru.spring.boot_security.service;

import org.springframework.stereotype.Service;
import ru.spring.boot_security.dao.RoleRepository;
import ru.spring.boot_security.model.Role;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public List<Role> showAllRoles() {
        return roleRepository.findAll();
    }
}
