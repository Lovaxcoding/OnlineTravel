package com.example.OnlineTravel;

import com.example.OnlineTravel.models.Reservation;
import com.example.OnlineTravel.models.User;
import com.example.OnlineTravel.repositories.ReservationRepositories;
import com.example.OnlineTravel.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OnlineTravelApplicationTests {

	@Autowired
	private ReservationRepositories reservationRepository;

	@Autowired
	private UserRepository userRepository;

	@Test
	@Transactional
	 // Assure que les données sont rollback après le test
	public void testCreateReservation() {

	}
}
