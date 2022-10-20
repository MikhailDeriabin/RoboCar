#ifndef WIFIMQTTCONNECTOR_H
#define WIFIMQTTCONNECTOR_H

#include <MQTTClient.h>
#include <WiFi.h>
#include <SensorValue.h>

class WiFiMQTTConnector{
private:
    char* ssid = "ASUS_28";
    const char* password = "228asus228";

    const char* mqtt_server = "192.168.50.93";
    const int mqtt_port = 1884;
    WiFiClient wifiClient;
    PubSubClient* pubSubClient;

    char* clientId;   
    int componentCount;
    char** topics;

    void setup_wifi();
public:
    WiFiMQTTConnector(char* clientId, const int componentCount);
    void connectToBroker();
    int getDeviceIdFromTopic(char* topic);
    PubSubClient* getPubSubClient();
    char** getTopics();
    char* getTopicById(int id);
    void sendSensorValues(char* topic, SensorValue sensorValues[], float values[], int valuesCount);
};

#endif