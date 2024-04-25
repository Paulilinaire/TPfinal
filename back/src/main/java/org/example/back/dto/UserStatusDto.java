package org.example.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.back.entity.User;

@Data
@AllArgsConstructor
public class UserStatusDto {
    private User user;
    private boolean status;
}
