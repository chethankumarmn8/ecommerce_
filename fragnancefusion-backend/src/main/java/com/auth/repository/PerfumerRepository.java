// PerfumerRepository.java
package com.auth.repository;

import com.auth.model.Perfumer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PerfumerRepository extends JpaRepository<Perfumer, Long> {
    Optional<Perfumer> findByEmail(String email);
    boolean existsByEmail(String email);
}