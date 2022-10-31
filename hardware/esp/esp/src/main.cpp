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

void clearCharArray(char arr[], int arrSize);
void sendData(char str[], int strSize);

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

const int bufferSize = 50;
char serialBuffer[bufferSize];
int serialBufferIndex = 0;

void loop() {
  client->loop();
  
  if(Serial.available() > 0) {
    char incomingChar = (char)Serial.read();

    serialBuffer[serialBufferIndex] = incomingChar;
    serialBufferIndex++;

    if(incomingChar == ';'){
      sendData(serialBuffer, serialBufferIndex);
      clearCharArray(serialBuffer, serialBufferIndex);
      serialBufferIndex = 0;
    }
  }
}

void clearCharArray(char arr[], int arrSize){
  for(int i=0; i<arrSize; i++){
    arr[i] = 0;
  }
}

void sendData(char str[], int strSize){
  Converter converter;
  Util util;

  int valueStartIndex = 0;
  for(int i = 0; i<strSize; i++){   
    if(str[i] == '_'){
      valueStartIndex = i+1;
      break;
    }
  }
  int idSize = valueStartIndex - 1;
  
  //TODO: calculate clientId size
  int topicSize = 1 + idSize + 1;
  char topic[topicSize];
  int topicIndex = 0;
  for(int j=0; j<1; j++){
    topic[topicIndex] = clientId[j];
    topicIndex++;
  }
  topic[topicIndex] = '/';
  topicIndex++;
  for(int j=0; j<idSize; j++){
    topic[topicIndex] = str[j];
    topicIndex++;
  }

  int valueStringSize = strSize - valueStartIndex;
  char valueString[valueStringSize];
  util.splitCharArr(str, valueString, valueStartIndex, strSize);

  client->publish(topic, valueString);
}