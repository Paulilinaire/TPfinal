package org.example.back.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.back.entity.User;

@Setter
@Getter
public class BaseResponseDto    {

    private Object message;
    private Object data;


    public BaseResponseDto(Object message, Object data) {
        this.message = message;
        this.data = data;
    }

    public BaseResponseDto(Object message) {
        this.message = message;
    }

}