package com.example.devicewebservice.Controllers;

import com.example.devicewebservice.Models.Device;
import com.example.devicewebservice.Service.SocketService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ApiController {

    @Autowired
    private final SocketService socketService;
    //Runs updateClients() when recieving POST request from API.
    @PostMapping("/update")
    public void updateClients(@RequestBody Device deviceinfo) {
        socketService.updateClients(deviceinfo);
    }
}
