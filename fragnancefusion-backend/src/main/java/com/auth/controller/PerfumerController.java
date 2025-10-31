// PerfumerController.java
package com.auth.controller;

import com.auth.dto.PerfumerRegisterRequest;
import com.auth.dto.AuthenticationResponse;
import com.auth.dto.LoginRequest;
import com.auth.model.Perfumer;
import com.auth.repository.PerfumerRepository;
import com.auth.service.PerfumerService;
import com.auth.service.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

@RestController
@RequestMapping("/api/perfumer/auth")
@RequiredArgsConstructor
public class PerfumerController {

    private final PerfumerService perfumerService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final PerfumerRepository perfumerRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerPerfumer(
            @ModelAttribute PerfumerRegisterRequest request,
            @RequestParam("certification") MultipartFile certification
    ) {
        try {
            Perfumer perfumer = perfumerService.createPerfumer(request, certification);
            String token = jwtUtil.generateToken(perfumer.getEmail(), perfumer.getId(), "ROLE_PERFUMER");
            return ResponseEntity.ok(new AuthenticationResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Collections.singletonMap("message", "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginPerfumer(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Perfumer perfumer = perfumerRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("Perfumer not found"));

            String token = jwtUtil.generateToken(perfumer.getEmail(), perfumer.getId(), "ROLE_PERFUMER");
            return ResponseEntity.ok(new AuthenticationResponse(token));

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
}