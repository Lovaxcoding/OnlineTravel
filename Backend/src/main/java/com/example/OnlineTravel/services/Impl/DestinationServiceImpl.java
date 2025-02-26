package com.example.OnlineTravel.services.Impl;

import com.example.OnlineTravel.models.Destination;
import com.example.OnlineTravel.repositories.DestinationRepository;
import com.example.OnlineTravel.services.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DestinationServiceImpl implements DestinationService {
    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    @Override
    public Destination getDestinationById(Long id) {
        return destinationRepository.findById(id).orElse(null);
    }

    @Override
    public Destination createDestination(Destination destination) {
        destinationRepository.save(destination);
        return null;
    }

    @Override
    public Destination updateDestination(Long id, Destination destination) {
        if (destinationRepository.existsById(id)) {
            destination.setId(id);
            return destinationRepository.save(destination);
        }
        return null;
    }

    @Override
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);

    }


}
