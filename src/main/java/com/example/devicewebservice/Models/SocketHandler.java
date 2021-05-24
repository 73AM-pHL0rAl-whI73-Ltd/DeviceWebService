package com.example.devicewebservice.Models;


import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    private static final List<Session> sessions = new CopyOnWriteArrayList<>();

    //updates clients when message is recieved from API and sends message to app.js.
    @SneakyThrows
    public void updateClients(Device deviceinfo) {
        for(var session : sessions)
        {
            var alias = session.getDevice().getDeviceAlias();
            if(session.getDevice() == null)
            {
                session.getSession().sendMessage(new TextMessage(alias));
            } else if(session.getDevice() != null &
                    session.getDevice().getDeviceAlias().equalsIgnoreCase(deviceinfo.getDeviceAlias())) {
                session.getSession().sendMessage(new TextMessage(alias));
            }
            System.out.println("ws-update device alias : " + alias);
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleMessage(session, message);
        // find session
        var clientMaybe = sessions.
                stream().
                filter(clientsession -> clientsession.getSession() == session).
                findFirst();
        // get message
        Map value = new Gson().fromJson(message.getPayload(), Map.class);

        if(clientMaybe.isPresent()) {
            // get client
            var client = clientMaybe.get();

            if(value.containsKey("deviceAlias")) // set client serverside deviceAlias
                client.getDevice().setDeviceAlias((String)value.get("deviceAlias"));
            else // remove device subscription
                client.setDevice(null);
        }
    }

    @Override // removes session from list when connected
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        for(var clientsession : sessions)
            if(clientsession.getSession() == session)
                sessions.remove(clientsession);

        super.afterConnectionClosed(session, status);
    }

    @Override //Adds session to list when connected.
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        var clientsession = new Session();
        clientsession.setSession(session);

        sessions.add(clientsession);

        super.afterConnectionEstablished(session);
    }
}