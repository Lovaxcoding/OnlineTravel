package com.example.OnlineTravel.services;

import com.example.OnlineTravel.models.Destination;
import com.example.OnlineTravel.models.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DestinationService {
    List<Destination> getAllDestinations();
    Destination getDestinationById(Long id);
    Destination createDestination(Destination destination);
    Destination updateDestination(Long id, Destination destination);
    void deleteDestination(Long id);
}
