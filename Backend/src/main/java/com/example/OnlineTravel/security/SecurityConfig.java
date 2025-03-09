package com.example.OnlineTravel.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/auth/**").permitAll()  // Accès libre aux endpoints d'authentification
                        .requestMatchers("/api/v1/reservations/**").permitAll()
                        .requestMatchers("/api/v1/reservations").permitAll()// Accès réservé aux utilisateurs connectés
                        .requestMatchers("/api/v1/destinations/**").permitAll()
                        .requestMatchers("/api/v1/user").permitAll()// Accès libre aux visiteurs
                        .requestMatchers("/api/v1/user/**").permitAll()// Accès libre aux visiteurs
                        .requestMatchers("/api/v1/auth/check-session").permitAll()
                        .anyRequest().authenticated()
                )
                .cors().and()
                .formLogin()
                .and()
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200))
                .and()
                .sessionManagement(session -> session
                        .maximumSessions(1)
                        .expiredUrl("/api/v1/auth/session-expired")
                )
                .csrf().disable(); // Désactiver CSRF pour Postman (attention en prod)

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
