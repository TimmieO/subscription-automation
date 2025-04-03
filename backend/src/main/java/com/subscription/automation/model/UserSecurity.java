package com.subscription.automation.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_security")
public class UserSecurity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private int failedLoginAttempts = 0;

    @Column
    private LocalDateTime lastFailedLogin;

    @Column
    private LocalDateTime lastSuccessfulLogin;

    @Column
    private LocalDateTime accountLockedUntil;

    @Column(nullable = false)
    private int requestCount = 0;

    @Column
    private LocalDateTime lastRequestTime;

    @Column
    private LocalDateTime lastRequestReset;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime updatedAt;
} 