package org.example.back.config;

import org.example.back.entity.JobTitle;
import org.example.back.entity.Role;
import org.example.back.entity.User;
import org.example.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class InitConfig implements CommandLineRunner {

    @Autowired
    private UserRepository repository;


    private void thereIsAdmin(){
        User user=repository.searchUserByRole(Role.ADMIN);
        if(user==null){
            User admin=User.builder().
                    firstname("admin").
                    lastname("admin").
                    jobTitle(JobTitle.ADMIN).
                    email("admin@mail.fr").
                    password("admin").build();
            repository.save(admin);
        }
    }
    @Override
    public void run(String... args) throws Exception {
        thereIsAdmin();
    }
}
