package com.example.devicewebservice.Models;

import com.google.gson.Gson;
import lombok.Cleanup;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message)
            throws InterruptedException, IOException {
        Map value = new Gson().fromJson(message.getPayload(), Map.class);

        for(WebSocketSession webSocketSession : sessions) {
            webSocketSession.sendMessage(new TextMessage(""));
        }
    }

    public void updateClients() {
        sessions.forEach(session -> {
            try {
                session.sendMessage(new TextMessage(""));
            } catch (IOException ioException) {
                ioException.printStackTrace();
            }
        });
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        session.sendMessage(new TextMessage(""));
    }
}
