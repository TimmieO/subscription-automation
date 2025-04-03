package com.subscription.automation.repository;

import com.subscription.automation.model.ScriptExecution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScriptExecutionRepository extends JpaRepository<ScriptExecution, Long> {
    long countByCreatedAtAfter(LocalDateTime dateTime);

    @Query("SELECT COALESCE(SUM(se.tokensUsed), 0) FROM ScriptExecution se WHERE se.createdAt > :dateTime")
    long sumTokensUsedSince(@Param("dateTime") LocalDateTime dateTime);

    @Query("SELECT DATE(se.createdAt) as date, COUNT(se) as count " +
           "FROM ScriptExecution se " +
           "WHERE se.createdAt BETWEEN :startDate AND :endDate " +
           "GROUP BY DATE(se.createdAt) " +
           "ORDER BY date")
    List<Object[]> countByCreatedAtBetweenGroupByDate(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );

    @Query("SELECT s.type, SUM(se.tokensUsed) as totalTokens " +
           "FROM ScriptExecution se " +
           "JOIN se.script s " +
           "GROUP BY s.type " +
           "ORDER BY totalTokens DESC")
    List<Object[]> sumTokensUsedByScriptType();

    Page<ScriptExecution> findByScriptId(Long scriptId, Pageable pageable);
    Page<ScriptExecution> findByScriptIdAndStatus(Long scriptId, String status, Pageable pageable);
    ScriptExecution findFirstByScriptIdOrderByCompletedAtDesc(Long scriptId);
    List<ScriptExecution> findByScriptId(Long scriptId);
    long countByScriptId(Long scriptId);
    long countByScriptIdAndStatus(Long scriptId, String status);

    Page<ScriptExecution> findByScriptIdAndStartedAtBetween(
        Long scriptId,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Pageable pageable
    );

    Page<ScriptExecution> findByScriptIdAndStatusAndStartedAtBetween(
        Long scriptId,
        String status,
        LocalDateTime startDate,
        LocalDateTime endDate,
        Pageable pageable
    );
} 