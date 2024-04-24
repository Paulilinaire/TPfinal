package org.example.back.controller;

import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.ErrorDto;
import org.example.back.dto.WorkHourOnDateDto;
import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.service.PointingService;
import org.example.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/user")
@RestController
public class UserController {

    @Autowired
    private PointingService pointingService;

    @Autowired
    private UserService userService;

    @GetMapping("/pointing/start")
    public BaseResponseDto clockIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (!pointingService.clockIn(user)) {
            return new BaseResponseDto("Error", new ErrorDto("POINTING_NOT_END"));
        } else {
            return new BaseResponseDto("Success");
        }
    }

    @GetMapping("/pointing/end")
    public BaseResponseDto clockOut() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (!pointingService.clockOut(user)) {
            return new BaseResponseDto("Error", new ErrorDto("POINTING_NOT_START"));
        } else {
            return new BaseResponseDto("Success");
        }
    }

    @PostMapping("/pointing/week")
    public BaseResponseDto getPointingOfTheWeek(@RequestBody Map<String, String> requestBody) {
        String date = requestBody.get("date");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(date, formatter);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        List<Pointing> pointingList = pointingService.getPointingOfWeek(localDate, user);
        long totalWorkMinutes = 0;
        for (Pointing p : pointingList) {
            long minutes = ChronoUnit.MINUTES.between(p.getStartDate(), p.getEndDate());
            totalWorkMinutes += minutes;
        }

        int totalWorkHours =(int) totalWorkMinutes / 60;


        int overtime =  totalWorkHours - 35;
        if (overtime < 0) {
            overtime = 0;
        }

        pointingList=pointingService.getPointingOfTheDay(localDate,user);

        return new BaseResponseDto("Success", new WorkHourOnDateDto(totalWorkHours, overtime,pointingList));
    }
}
