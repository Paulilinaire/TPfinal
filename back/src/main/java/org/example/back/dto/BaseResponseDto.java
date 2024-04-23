package org.example.back.dto;

import org.example.back.entity.User;

public class BaseResponseDto    {

    private Object message;
    private Object data;
    private User user;


    public BaseResponseDto(Object message, Object data, User user) {
        this.message = message;
        this.data = data;
        this.user = user;
    }


    public BaseResponseDto(Object message) {
        this.message = message;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}