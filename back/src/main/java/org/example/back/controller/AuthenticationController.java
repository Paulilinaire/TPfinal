package org.example.back.controller;

import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

    @Autowired
    private UserService userService;
    @PostMapping("/auth/admin")
    public ResponseEntity<?> login(@RequestBody Map<String ,String> credentials){
        String mail = credentials.get("mail");
        String password = credentials.get("password");


        if (userService.checkUserNameExists(mail)) {
            if (userService.verifyUser(mail, password)) {
                String token = userService.generateToken(mail, password);
                Map<String, Object> data = new HashMap<>();
                data.put("token", token);
                return ResponseEntity.ok(data);
            } else {
                return ResponseEntity.badRequest().body("Bad login");
            }
        } else {
            return ResponseEntity.badRequest().body("Bad login");
        }
    }
}
