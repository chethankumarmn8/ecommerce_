package com.auth.service;

import com.auth.model.Perfumer;
import com.auth.model.User;
import com.auth.repository.PerfumerRepository;
import com.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PerfumerRepository perfumerRepository; // Changed from ArtisanRepository

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // First check if Perfumer exists
        Perfumer perfumer = perfumerRepository.findByEmail(email)
                .orElse(null);

        if (perfumer != null) {
            return buildPerfumerDetails(perfumer); // Renamed method
        }

        // Fallback to general User
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return buildUserDetails(user);
    }

    private UserDetails buildPerfumerDetails(Perfumer perfumer) {
        return org.springframework.security.core.userdetails.User
                .withUsername(perfumer.getEmail())
                .password(perfumer.getPassword())
                .authorities("ROLE_PERFUMER") // Updated role
                .build();
    }

    private UserDetails buildUserDetails(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole())
                .build();
    }
}