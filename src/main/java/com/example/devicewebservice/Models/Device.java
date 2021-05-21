package com.example.devicewebservice.Models;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.UUID;

@Data
public class Device { // represents device
    private @JsonProperty("deviceId") UUID deviceId;
    private @JsonProperty("deviceAlias") String deviceAlias;
    private @JsonProperty("macAddress") String macAddress;
    private @JsonProperty("sensorType") String sensorType;
}