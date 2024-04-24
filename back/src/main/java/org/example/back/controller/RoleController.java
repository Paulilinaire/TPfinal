package org.example.back.controller;

import org.example.back.entity.Role;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    @GetMapping
    public Role[] getRoles() {
        return Role.values();
    }
}