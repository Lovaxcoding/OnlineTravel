package com.example.OnlineTravel.controllers;


import com.example.OnlineTravel.models.Destination;
import com.example.OnlineTravel.repositories.DestinationRepository;
import com.example.OnlineTravel.services.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@Transactional
@RequestMapping("/api/v1/destinations")
public class DestinationController {
    @Autowired
    private DestinationService destinationService;

    @GetMapping
    public ResponseEntity<List<Destination>> getAllDestinations() {
        List<Destination> destinations = destinationService.getAllDestinations();
        return ResponseEntity.ok(destinations);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Destination> getDestination(@PathVariable Long id) {
        Destination destination = destinationService.getDestinationById(id);
        if(destination != null) {
            return ResponseEntity.ok(destination);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public ResponseEntity<Destination> createDestination(@RequestBody Destination destination) {
        Destination destination1 = destinationService.createDestination(destination);
        if(destination1 != null) {
            return ResponseEntity.ok(destination1);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Destination> updateDestination(@PathVariable Long id, @RequestBody Destination destination) {
        Destination destination1 = destinationService.updateDestination(id, destination);
        if(destination1 != null) {
            return ResponseEntity.ok(destination1);

        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteDestination(@PathVariable Long id) {
        try{
            destinationService.deleteDestination(id);
            return ResponseEntity.ok("Deleted destination");
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed deletion destination : " + e.getMessage());
        }
    }
}
