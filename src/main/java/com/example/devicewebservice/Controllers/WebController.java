package com.example.devicewebservice.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@Controller
public class WebController {
    //Shows website from index.html on /.
    @RequestMapping(value = "/", method = GET, headers = "Connection!=Upgrade")
    public String status() {
        return "index";
    }

    @GetMapping("/register")
    public String register() {
        return "register";
    }
}
