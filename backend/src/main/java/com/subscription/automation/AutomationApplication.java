package com.subscription.automation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.subscription.automation.model")
@EnableJpaRepositories("com.subscription.automation.repository")
public class AutomationApplication {
    public static void main(String[] args) {
        SpringApplication.run(AutomationApplication.class, args);
    }
} 