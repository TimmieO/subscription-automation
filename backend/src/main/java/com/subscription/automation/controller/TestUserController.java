package com.subscription.automation.controller;

import com.subscription.automation.model.Role;
import com.subscription.automation.model.User;
import com.subscription.automation.repository.RoleRepository;
import com.subscription.automation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/test")
public class TestUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create-test-user")
    public ResponseEntity<?> createTestUser() {
        // Check if test user already exists
        if (userRepository.findByEmail("test@example.com").isPresent()) {
            return ResponseEntity.badRequest().body("Test user already exists");
        }

        // Create test user
        User user = new User();
        user.setName("Test User");
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("password123"));
        user.setActive(true);

        // Get or create roles
        Set<Role> roles = new HashSet<>();
        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
            .orElseGet(() -> {
                Role role = new Role();
                role.setName("ROLE_ADMIN");
                role.setDescription("Administrator role");
                return roleRepository.save(role);
            });
        Role userRole = roleRepository.findByName("ROLE_USER")
            .orElseGet(() -> {
                Role role = new Role();
                role.setName("ROLE_USER");
                role.setDescription("Regular user role");
                return roleRepository.save(role);
            });
        roles.add(adminRole);
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);
        return ResponseEntity.ok("Test user created successfully");
    }
} 