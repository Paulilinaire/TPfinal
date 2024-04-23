package org.example.back.controller;

import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.ErrorDto;
import org.example.back.entity.User;
import org.example.back.service.PointingService;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/user")
@RestController
public class UserController {

    @Autowired
    private PointingService pointingService;

    @Autowired
    private UserService userService;

    @GetMapping("/pointing/start")
    public BaseResponseDto clockIn(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user=(User) authentication.getPrincipal();
        if(!pointingService.clockIn(user)){
            return new BaseResponseDto("Error",new ErrorDto("POINTING_NOT_END"));
        }else{
            return new BaseResponseDto("Success");
        }
    }

    @GetMapping("/pointing/end")
    public BaseResponseDto clockOut(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user=(User) authentication.getPrincipal();
        if(!pointingService.clockOut(user)){
            return new BaseResponseDto("Error",new ErrorDto("POINTING_NOT_START"));
        }else{
            return new BaseResponseDto("Success");
        }
    }
}
