package com.example.devicewebservice.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class WebController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
