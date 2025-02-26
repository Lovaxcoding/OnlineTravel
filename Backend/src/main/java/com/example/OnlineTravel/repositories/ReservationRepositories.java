package com.example.OnlineTravel.repositories;
import com.example.OnlineTravel.models.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepositories extends JpaRepository<Reservation, Long>{

}
