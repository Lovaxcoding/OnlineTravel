package com.example.OnlineTravel.services.Impl;

import com.example.OnlineTravel.models.Hotel;
import com.example.OnlineTravel.repositories.HotelRepository;
import com.example.OnlineTravel.services.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelServiceImpl implements HotelService {
    @Autowired
    private HotelRepository hotelRepository;


    @Override
    public List<Hotel> GetAllHotel() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElse(null);
    }

    @Override
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {
        if(hotelRepository.existsById(id)) {
            hotel.setId(id);
            return hotelRepository.save(hotel);
        }
        return null;
    }

    @Override
    public void deleteHotel(Long id) {
        if(hotelRepository.existsById(id)) {
            hotelRepository.deleteById(id);
        }
    }


}
