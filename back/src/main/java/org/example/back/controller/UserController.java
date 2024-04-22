package org.example.back.controller;


import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.UserLoginDto;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth/user")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping
    public BaseResponseDto loginUser(@RequestBody UserLoginDto loginDetails){
        if(userService.checkUserNameExists(loginDetails.getEmail())){
            if(userService.verifyUser(loginDetails.getEmail(), loginDetails.getPassword())){
                Map<String, Object> data = new HashMap<>();

                data.put("token", userService.generateToken(loginDetails.getEmail(), loginDetails.getPassword()));
                return new BaseResponseDto("Login with success", data);
            }else {

                return new BaseResponseDto("Wrong password");
            }
        }else {

            return new BaseResponseDto("User does not exist");
        }
    }

}
