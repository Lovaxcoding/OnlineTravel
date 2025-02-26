package com.example.OnlineTravel.controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HelloControllers {
    public String helloWorld(){
        return "hello world";
    }
}

