package com.example.devicewebservice.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
@NoArgsConstructor
public class Session {
    private Device device;
    private WebSocketSession session;
}
