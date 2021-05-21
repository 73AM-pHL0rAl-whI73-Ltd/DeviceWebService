package com.example.devicewebservice.Models;


import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    private static final List<Session> sessions = new CopyOnWriteArrayList<>();

    //updates clients when message is recieved from API and sends message to app.js.
    @SneakyThrows
    public void updateClients() {
        for(var session : sessions)
        {
            session.getSession().sendMessage(new TextMessage(""));
            System.out.println("message sent");
        }

    }


    @Override // removes session from list when connected
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        for(var clientsession : sessions)
            if(clientsession.getSession() == session)
            {
                sessions.remove(clientsession);
                System.out.println("session removed");
            }

        //sessions.remove(session);
        super.afterConnectionClosed(session, status);
    }

    @Override //Adds session to list when connected.
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        var clientsession = new Session();
        clientsession.setSession(session);
        sessions.add(clientsession);
        System.out.println("session added");
        //sessions.add(session);
        super.afterConnectionEstablished(session);
    }
}