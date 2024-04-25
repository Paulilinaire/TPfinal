package org.example.back.controller;

import org.example.back.dto.BaseResponseDto;
import org.example.back.dto.MonthPointingDto;
import org.example.back.dto.WorkHourOnDateDto;
import org.example.back.entity.Pointing;
import org.example.back.entity.User;
import org.example.back.service.PointingService;
import org.example.back.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class AdminController {

    private final UserService userService;

    private final PointingService pointingService;

    public AdminController(UserService userService, PointingService pointingService) {
        this.userService = userService;
        this.pointingService = pointingService;
    }

    @PostMapping
    public boolean createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userUpdateDetails) {
        final User updatedUser = userService.updateUser(id, userUpdateDetails);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable Long id) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", userService.deleteUser(id));
        return response;
    }

    @PostMapping("/pointing/month")
    public BaseResponseDto getPointingOfTheMonth(@RequestBody MonthPointingDto monthPointingDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate localDate = LocalDate.parse(monthPointingDto.getDate(), formatter);
        User user = userService.getUserById(monthPointingDto.getId());
        List<Pointing> pointingList = pointingService.getPointingOfThePreviousMonth(localDate, user );

        long totalWorkMinutes = 0;
        int overtime = 0;
        for (Pointing p : pointingList) {
            totalWorkMinutes += ChronoUnit.MINUTES.between(p.getStartDate(), p.getEndDate());
            overtime += (int) (ChronoUnit.MINUTES.between(p.getStartDate(), p.getEndDate()) - 480);
        }
        int totalWorkHours = (int) totalWorkMinutes / 60;

        int standardWorkHoursPerMonth = 35 * 4; // Assuming 4 weeks in a month
        if (overtime < 0) {
            overtime = 0;
        }

        return new BaseResponseDto("Success", new WorkHourOnDateDto(totalWorkHours, overtime, pointingList));
    }
}
