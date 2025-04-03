package com.subscription.automation.repository;

import com.subscription.automation.model.Script;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScriptRepository extends JpaRepository<Script, Long> {
    long countByActive(boolean active);
} 