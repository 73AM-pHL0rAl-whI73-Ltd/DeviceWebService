package com.example.devicewebservice.Controllers;

import com.example.devicewebservice.Models.SocketHandler;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ApiController {

    @Autowired
    private final SocketHandler socketHandler;

    @PostMapping("update")
    public void updateClients() {

        socketHandler.updateClients();
    }
}
