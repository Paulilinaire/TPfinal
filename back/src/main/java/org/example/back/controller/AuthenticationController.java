package org.example.back.controller;

import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.UserLoginDto;
import org.example.back.entity.Role;
import org.example.back.entity.User;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @PostMapping("/admin")
    public ResponseEntity<?> login(@RequestBody Map<String ,String> credentials){
        String mail = credentials.get("mail");
        String password = credentials.get("password");


        if (userService.checkUserNameExists(mail)) {
            if (userService.verifyUser(mail, password)) {
                String token = userService.generateToken(mail, password);
                Map<String, Object> data = new HashMap<>();
                data.put("token", token);
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                User user=(User) authentication.getPrincipal();
                if(user.getRole()!= Role.ROLE_ADMIN){
                    return ResponseEntity.badRequest().body("Bad login");
                }
                return ResponseEntity.ok(data);
            } else {
                return ResponseEntity.badRequest().body("Bad login");
            }
        } else {
            return ResponseEntity.badRequest().body("Bad login");
        }
    }
    @PostMapping("/user")
    public BaseResponseDto loginUser(@RequestBody UserLoginDto loginDetails) {
            if (userService.verifyUser(loginDetails.getEmail(), loginDetails.getPassword())) {
                Map<String, Object> data = new HashMap<>();
                data.put("token", userService.generateToken(loginDetails.getEmail(), loginDetails.getPassword()));
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                User user=(User) authentication.getPrincipal();
                user.setPointingList(new ArrayList<>());
                data.put("user", user);
                return new BaseResponseDto("Login successful", data);
            } else {
                return new BaseResponseDto("Incorrect logins");
            }
    }
}
