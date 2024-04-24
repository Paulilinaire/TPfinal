package org.example.back.controller;

import org.example.back.dto.UserStatusDto;
import org.example.back.entity.User;
import org.example.back.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public boolean createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping
    public ResponseEntity<List<UserStatusDto>> getAllUsers() {
        List<UserStatusDto> userStatusDtos = new ArrayList<>();
        for (User user : userService.getAllUsers()) {
/*
            Todo :
             Créer un service
             qui se sert de la méthode searchLastPointing du PointingRepository
             et qui renvoit true ou false si le end_date est à null
*/
            boolean status = ;
            userStatusDtos.add(new UserStatusDto(user, status));
        }
        return ResponseEntity.ok(userStatusDtos);
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
}
