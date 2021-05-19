package com.example.devicewebservice.Models;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    public static List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();
    //updates clients when message is recieved from API and sends message to app.js.
    public void updateClients() {
        for (WebSocketSession webSocketSession : sessions) {
            try {
                webSocketSession.sendMessage(new TextMessage(""));
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        }
    }
    //Adds session to list when connected.
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);

    }

}