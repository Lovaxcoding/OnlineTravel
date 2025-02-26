package com.example.OnlineTravel.services.Impl;

import com.example.OnlineTravel.models.Reservation;
import com.example.OnlineTravel.repositories.ReservationRepositories;
import com.example.OnlineTravel.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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
        Optional<Reservation> reservation = reservationRepositories.findById(id);
        return reservation.orElse(null);
    }

    @Override
    public Reservation createReservation(Reservation reservation) {
        return reservationRepositories.save(reservation);
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
        if(id != null) {
            reservationRepositories.deleteById(id);

        }
    }


}
