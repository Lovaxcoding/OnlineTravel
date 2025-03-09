package com.example.OnlineTravel.controllers;

import com.example.OnlineTravel.models.User;
import com.example.OnlineTravel.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Inscription de l'utilisateur
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // Vérification de l'existence de l'email
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email déjà utilisé!";
        }

        // Cryptage du mot de passe avant de l'enregistrer
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "Utilisateur enregistré avec succès!";
    }

    // Connexion de l'utilisateur
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

        if (optionalUser.isPresent() && passwordEncoder.matches(user.getPassword(), optionalUser.get().getPassword())) {
            session.setAttribute("USER", optionalUser.get()); // Stocker l'utilisateur en session
            return ResponseEntity.ok(Map.of("message", "Connexion réussie!", "user", optionalUser.get()));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Email ou mot de passe invalide!"));
    }
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        User user = (User) session.getAttribute("USER");
        if (user != null) {
            return ResponseEntity.ok(Map.of("message", "Session active", "user", user));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Session expirée"));
    }


    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    // Déconnexion de l'utilisateur
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Déconnexion réussie!";
    }

    // Vérification de la session utilisateur
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    @GetMapping("/session")
    public Object getSession(HttpSession session) {
        return session.getAttribute("USER");
    }
}
