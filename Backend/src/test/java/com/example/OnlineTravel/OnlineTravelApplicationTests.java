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
		// Créer un utilisateur d'abord et le sauvegarder
		User user = new User("0344583202", "lnantenaina78@gmail.com", "Lovasoa Nantenaina");
		user = userRepository.save(user); // Sauvegarde en base pour avoir un ID

		// Vérifie que l'utilisateur a été enregistré
		assertNotNull(user.getId());

		// Création d'une réservation
		Reservation reservation = new Reservation(null, "Isalo", LocalDate.now(), LocalDate.now().plusDays(3), 12, 120000, user);
		reservation = reservationRepository.save(reservation);

		// Vérifie que la réservation est bien enregistrée
		assertNotNull(reservation.getIdReservation());
	}
}
