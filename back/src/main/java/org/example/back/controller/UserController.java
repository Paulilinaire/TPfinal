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

    @Autowired
    UserRepository userRepository;


    @PostMapping
    public BaseResponseDto loginUser(@RequestBody UserLoginDto loginDetails){
        if(userService.checkUserNameExists(loginDetails.getEmail())){
            if(userService.verifyUser(loginDetails.getEmail(), loginDetails.getPassword())){
                Map<String, Object> data = new HashMap<>();
                System.out.println(loginDetails.getEmail());
                System.out.println(loginDetails.getPassword());
                Optional<User> user = userService.getUserByEmailAndPassword(loginDetails.getEmail(), loginDetails.getPassword());
                User userRecup = user.get();
                data.put("token", userService.generateToken(loginDetails.getEmail(), loginDetails.getPassword()));
                return new BaseResponseDto("Login with success", data, userRecup);
            }else {
                return new BaseResponseDto("Wrong password");
            }
        }else {
            return new BaseResponseDto("User does not exist");
        }
    }

}
