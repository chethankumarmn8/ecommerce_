// PerfumerService.java
package com.auth.service;

import com.auth.dto.PerfumerRegisterRequest;
import com.auth.model.Perfumer;
import com.auth.repository.PerfumerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PerfumerService {

    private final PerfumerRepository perfumerRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    public Perfumer createPerfumer(PerfumerRegisterRequest request, MultipartFile certification) {
        if (perfumerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        try {
            String certificationPath = fileStorageService.storeFile(certification);

            Perfumer perfumer = Perfumer.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role("ROLE_PERFUMER")
                    .name(request.getName())
                    .fragranceType(request.getFragranceType())
                    .experience(request.getExperience())
                    .mobile(request.getMobile())
                    .location(request.getLocation())
                    .keyIngredients(request.getKeyIngredients())
                    .certificationPath(certificationPath)
                    .build();

            return perfumerRepository.save(perfumer);

        } catch (IOException e) {
            throw new RuntimeException("File storage failed: " + e.getMessage(), e);
        }
    }
}