package org.example.back.controller;


import lombok.Getter;
import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.UserLoginDto;
import org.example.back.entity.User;
import org.example.back.repository.UserRepository;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth/user")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping
    public BaseResponseDto loginUser(@RequestBody UserLoginDto loginDetails) {
        Optional<User> optionalUser = userService.getUserByEmail(loginDetails.getEmail());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (userService.verifyUser(loginDetails.getEmail(), loginDetails.getPassword())) {
                Map<String, Object> data = new HashMap<>();

                data.put("token", userService.generateToken(loginDetails.getEmail(), loginDetails.getPassword()));
                data.put("user", user);

                return new BaseResponseDto("Login successful", data, user);
            } else {
                return new BaseResponseDto("Incorrect password");
            }
        } else {
            return new BaseResponseDto("User does not exist");
        }
    }
}


