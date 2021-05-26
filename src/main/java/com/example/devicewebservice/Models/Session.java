package com.example.devicewebservice.Models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
public class Session {
    private Device device;
    private WebSocketSession session;

    public Session(WebSocketSession session) {
        this.session = session;
        this.device = new Device();
        this.device.setDeviceAlias("");
    }
}
