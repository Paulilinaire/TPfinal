package org.example.back.config;

import org.example.back.entity.JobTitle;
import org.example.back.entity.Role;
import org.example.back.entity.User;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InitConfig implements CommandLineRunner {

    @Autowired
    private UserService service;


    private void thereIsAdmin(){
        List<User> users=service.findUsersByRole(Role.ROLE_ADMIN);
        if(users.isEmpty()){
            User admin=User.builder().
                    firstname("admin").
                    lastname("admin").
                    jobTitle(JobTitle.ADMIN).
                    email("admin@mail.fr").
                    password("admin").
                    role(Role.ROLE_ADMIN).
                    build();

            service.createUser(admin);
        }
    }

    private void thereIsEmployee(){
        List<User> users=service.findUsersByRole(Role.ROLE_USER);
        if(users.isEmpty()){
            User employee=User.builder().
                    firstname("user").
                    lastname("user").
                    jobTitle(JobTitle.SALARY).
                    email("user@mail.fr").
                    password("user").
                    role(Role.ROLE_USER).
                    build();

            service.createUser(employee);
        }
    }
    @Override
    public void run(String... args) throws Exception {
        thereIsAdmin();
        thereIsEmployee();
    }
}