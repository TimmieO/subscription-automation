package com.automation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private SubscriptionTier tier;

    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer monthlyTokens;
    private boolean active;

    public enum SubscriptionTier {
        FREE,
        BASIC,
        PRO,
        ENTERPRISE
    }
} 