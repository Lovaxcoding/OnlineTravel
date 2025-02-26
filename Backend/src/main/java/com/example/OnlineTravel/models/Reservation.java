package com.example.OnlineTravel.models;
import com.example.OnlineTravel.models.User;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReservation;

    private String destination;
    private LocalDate dateDepart;
    private LocalDate dateRetour;

    @Override
    public String toString() {
        return "Reservation{" +
                "idReservation=" + idReservation +
                ", destination='" + destination + '\'' +
                ", dateDepart=" + dateDepart +
                ", dateRetour=" + dateRetour +
                ", nombrePersonnes=" + nombrePersonnes +
                ", prixTotal=" + prixTotal +
                ", user=" + user +
                '}';
    }

    public double getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(double prixTotal) {
        this.prixTotal = prixTotal;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getNombrePersonnes() {
        return nombrePersonnes;
    }

    public void setNombrePersonnes(int nombrePersonnes) {
        this.nombrePersonnes = nombrePersonnes;
    }

    public LocalDate getDateRetour() {
        return dateRetour;
    }

    public void setDateRetour(LocalDate dateRetour) {
        this.dateRetour = dateRetour;
    }

    public LocalDate getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(LocalDate dateDepart) {
        this.dateDepart = dateDepart;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Long getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Long idReservation) {
        this.idReservation = idReservation;
    }

    private int nombrePersonnes;
    private double prixTotal;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
