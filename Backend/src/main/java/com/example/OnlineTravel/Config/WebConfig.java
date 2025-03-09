package com.example.OnlineTravel.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")  // Remplacez par l'URL de votre site en production
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Ajouter OPTIONS pour les pré-vols
                // En-têtes personnalisés
                .allowedHeaders("*")
                .allowCredentials(true);
    }
} // <-- Assurez-vous que cette accolade est bien présente
