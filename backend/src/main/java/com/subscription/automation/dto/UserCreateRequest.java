package com.subscription.automation.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserCreateRequest {
    private String name;
    private String email;
    private String password;
    private List<String> roles;
} 