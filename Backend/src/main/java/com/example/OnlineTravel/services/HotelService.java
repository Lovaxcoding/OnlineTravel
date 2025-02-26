package com.example.OnlineTravel.services;

import com.example.OnlineTravel.models.Hotel;

import java.util.List;

public interface HotelService {
    List<Hotel> GetAllHotel();
    Hotel getHotelById(Long id);
    Hotel createHotel(Hotel hotel);
    Hotel updateHotel(Long id, Hotel hotel);
    void deleteHotel(Long id);
}
