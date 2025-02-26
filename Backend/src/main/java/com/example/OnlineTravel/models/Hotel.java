package com.example.OnlineTravel.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Hotel {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private String address;

    @Getter
    @Setter
    private int stars;
    @Getter
    @Setter
    private String Contact;

    @OneToOne(mappedBy ="hotel", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Destination destination;
}
