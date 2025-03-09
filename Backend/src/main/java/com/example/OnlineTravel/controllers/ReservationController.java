package com.example.OnlineTravel.controllers;

import com.example.OnlineTravel.models.Reservation;
import com.example.OnlineTravel.models.User;
import com.example.OnlineTravel.repositories.ReservationRepositories;
import com.example.OnlineTravel.repositories.UserRepository;
import com.example.OnlineTravel.services.ReservationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/reservations") // Définition du préfixe des routes
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReservationRepositories reservationRepositories;

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5173")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().body(null);  // Retourne un code 400 si l'ID est nul
        }

        System.out.println("Recherche de la réservation avec ID: " + id);

        Reservation reservation = reservationService.getReservationById(id);

        if (reservation != null) {
            System.out.println("Réservation trouvée : " + reservation);
            return ResponseEntity.ok(reservation);
        } else {
            System.out.println("Réservation introuvable !");
            return ResponseEntity.notFound().build();
        }
    }


    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<String> addReservation(@RequestBody Map<String, Object> requestData) {
        try {
            // Vérification et extraction de l'ID utilisateur
            Long userId = Long.valueOf(requestData.get("user_id").toString());
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

            // Création et assignation des valeurs à la réservation
            Reservation reservation = new Reservation();
            reservation.setDestination((String) requestData.get("destination"));
            reservation.setDateDepart(LocalDate.parse((String) requestData.get("date_depart")));
            reservation.setDateRetour(LocalDate.parse((String) requestData.get("date_retour")));
            reservation.setNombrePersonnes(Integer.parseInt(requestData.get("nombre_personnes").toString()));
            reservation.setPrixTotal(Double.parseDouble(requestData.get("prix_total").toString()));
            reservation.setUser(user); // Lier la réservation à l'utilisateur

            // Sauvegarde de la réservation dans la base de données
            reservationRepositories.save(reservation);

            return ResponseEntity.ok("Réservation ajoutée avec succès !");
        } catch (Exception e) {
            e.printStackTrace(); // Affiche l'exception pour le débogage
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur: " + e.getMessage());
        }
    }



    @PutMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:5173")
    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        Reservation existingReservation = reservationRepositories.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("La réservation avec l'ID " + id + " n'existe pas"));

        // Vérifie si la réservation a changé entre-temps (Optimistic Locking)
        if (!existingReservation.getVersion().equals(updatedReservation.getVersion())) {
            throw new ObjectOptimisticLockingFailureException(Reservation.class, id);
        }

        existingReservation.setDateDepart(updatedReservation.getDateDepart());
        existingReservation.setDateRetour(updatedReservation.getDateRetour());
        existingReservation.setDestination(updatedReservation.getDestination());
        existingReservation.setNombrePersonnes(updatedReservation.getNombrePersonnes());
        existingReservation.setPrixTotal(updatedReservation.getPrixTotal());
        existingReservation.setStatus(updatedReservation.getStatus());

        return reservationRepositories.save(existingReservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        if(id != null) {
            reservationService.deleteReservation(id);
            return ResponseEntity.ok(("Deleted reservation"));
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur de suppression");
        }
    }
}
