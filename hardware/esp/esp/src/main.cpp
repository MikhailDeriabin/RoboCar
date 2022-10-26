#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include "Status.h"
#include "CommandValue.h"
#include "Component.h"
#include "Converter.h"
#include "Util.h"
#include "WiFiMQTTConnector.h"

#define ESP8266_D1 5
#define ESP8266_D2 4
#define ESP8266_D3 0
#define ESP8266_D4 2
#define ESP8266_D5 14
#define ESP8266_D6 12
#define ESP8266_D7 13
#define ESP8266_D8 15

void callback(char *topic, byte *payload, unsigned int length);

char* clientId = "1";
//US, photo, dht, tilt + robot + US servo
const int componentCount = 6;

WiFiMQTTConnector* wifiMQTTConnector = new WiFiMQTTConnector(clientId, componentCount);
PubSubClient* client = wifiMQTTConnector->getPubSubClient();

void setup() {
  Serial.begin(115200); 
  
  delay(10);
  client->setCallback(callback);
  wifiMQTTConnector->connectToBroker();
}

void callback(char* topic, byte* payload, unsigned int length) {
  Converter converter;
  Util util;
  char msg[length];
  for (int i = 0; i < length; i++) {
    msg[i] = (char) payload[i];
  }

  int compIndex = wifiMQTTConnector->getDeviceIdFromTopic(topic);
  if(compIndex != -1){
    int indexSize;
    char indexRaw[10];
    converter.intToCharArr(compIndex, indexRaw, &indexSize);
    indexRaw[indexSize] = '_';

    int msgSize = indexSize + length + 1;
    char msgToSend[msgSize];
    util.concatCharArr(indexRaw, msg, msgToSend, (indexSize+1), length);

    util.sendStrSerial(msgToSend, msgSize);
  }
}

void loop() {
  client->loop();
}