package com.example.OnlineTravel.services;

import com.example.OnlineTravel.models.User;

import java.util.List;

public interface UserService {
    List<User> getAllUser();
    User getUserById(Long id);
    /*insertion client */
    User createUser(User user);
    /*Mise à jour*/
    User updateUser(Long id, User user);
    /*Delete user*/
    void deleteUser(Long id);

}
