package com.automation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "execution_logs")
public class ExecutionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "script_id")
    private Script script;

    @Enumerated(EnumType.STRING)
    private ExecutionStatus status;

    @Column(columnDefinition = "TEXT")
    private String output;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Integer tokensUsed;

    public enum ExecutionStatus {
        PENDING,
        RUNNING,
        COMPLETED,
        FAILED
    }
} 