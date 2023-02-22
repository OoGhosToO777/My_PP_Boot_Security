package ru.spring.boot_security.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {
    @Override
    public String getAuthority() {
        return null;
    }
}
