package com.example.OnlineTravel.services.Impl;

import com.example.OnlineTravel.models.Reservation;
import com.example.OnlineTravel.models.User;
import com.example.OnlineTravel.repositories.ReservationRepositories;
import com.example.OnlineTravel.repositories.UserRepository;
import com.example.OnlineTravel.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepositories reservationRepositories;

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepositories.findAll();
    }

    @Override
    public Reservation getReservationById(Long id) {
        return reservationRepositories.findById(id).orElse(null);  // Utilisation de findById
    }

    @Autowired
    private UserRepository userRepository;

    @Override
    public Reservation createReservation(Reservation reservation) {
        if (reservation == null || reservation.getUser() == null || reservation.getUser().getId() == null) {
            throw new IllegalArgumentException("Utilisateur ou données de réservation manquantes.");
        }

        User user = userRepository.findById(reservation.getUser().getId()).orElse(null);
        if (user != null) {
            reservation.setUser(user);
            reservation.setDateReservation(LocalDate.now());
            return reservationRepositories.save(reservation);
        }

        throw new IllegalArgumentException("Utilisateur introuvable.");
    }

    @Override
    public Reservation updateReservation(Long id, Reservation reservation) {
        if (reservationRepositories.existsById(id)) {
            reservation.setIdReservation(id);
            return reservationRepositories.save(reservation);
        }
        return null;
    }

    @Override
    public void deleteReservation(Long id) {
        if (id != null && reservationRepositories.existsById(id)) {
            reservationRepositories.deleteById(id);
        } else {
            throw new IllegalArgumentException("Réservation introuvable.");
        }
    }
}
