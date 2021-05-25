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
        String updateAlias = deviceinfo.getDeviceAlias();
        String deviceAlias;
        String alias = "";

        for(var session : sessions)
        {
            deviceAlias = session.getDevice().getDeviceAlias();

            if(deviceAlias.equalsIgnoreCase(updateAlias)) {
                alias = session.getDevice().getDeviceAlias();
                session.getSession().sendMessage(new TextMessage(alias));
            }
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // find session
        var clientMaybe = sessions.
                stream().
                filter(clientsession -> clientsession.getSession() == session).
                findFirst();

        if(clientMaybe.isPresent())
            updateClientSession(clientMaybe.get(), message);

    }
    private void updateClientSession(Session client, TextMessage message) {
        // unpack message
        Map value = new Gson().fromJson(message.getPayload(), Map.class);

        if(value.containsKey("deviceAlias")) // set client serverside deviceAlias
            client.getDevice().setDeviceAlias((String)value.get("deviceAlias"));
        else // remove device subscription
            client.getDevice().setDeviceAlias("");
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
        sessions.add(new Session(session));
        super.afterConnectionEstablished(session);
    }
}