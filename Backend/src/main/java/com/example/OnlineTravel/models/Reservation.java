package com.example.OnlineTravel.models;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reservation")
    private Long idReservation;

    @JsonProperty("destination")  // Assurez-vous que la propriété JSON correspond à "destination"
    private String destination;

    @JsonProperty("dateDepart")  // Correspond à "date_depart" dans le JSON, mais en camelCase ici
    private LocalDate dateDepart;

    @JsonProperty("dateRetour")  // Correspond à "date_retour" dans le JSON, mais en camelCase ici
    private LocalDate dateRetour;

    @JsonProperty("dateReservation")  // Vous pouvez utiliser "date_reservation" en camelCase si vous envoyez en camelCase
    private LocalDate dateReservation;

    @JsonProperty("nombrePersonnes")  // Correspond à "nombre_personnes" dans le JSON, mais en camelCase ici
    private int nombrePersonnes;

    @JsonProperty("prixTotal")  // Correspond à "prix_total" dans le JSON, mais en camelCase ici
    private double prixTotal;

    @JsonProperty("status")  // Assurez-vous que cela correspond à ce que vous envoyez
    @Column(name = "status", nullable = false)
    private int status = 0;

    @JsonProperty("version")  // Ajoutez cette annotation si vous envoyez la version
    @Version
    private Integer version;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference  // Cette annotation permet de gérer les références circulaires avec User
    private User user;

    @Override
    public String toString() {
        return "Reservation{" +
                "idReservation=" + idReservation +
                ", destination='" + destination + '\'' +
                ", dateDepart=" + dateDepart +
                ", dateRetour=" + dateRetour +
                ", nombrePersonnes=" + nombrePersonnes +
                ", prixTotal=" + prixTotal +
                ", user=" + (user != null ? user.getId() : "null") +
                '}';
    }
}
