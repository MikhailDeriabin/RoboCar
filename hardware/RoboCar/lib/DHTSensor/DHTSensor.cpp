#include "DHTSensor.h"
#include "Arduino.h"
#include "Adafruit_Sensor.h"
#include "DHT.h"
#include <Status.h>
#include <Converter.h>
#include <Component.h>
#include <Util.h>
#include "Sensor.h"
#include <CommandValue.h>
#include "SensorValue.h"

DHTSensor::DHTSensor(int pinNumber) : pinNumber(pinNumber), Sensor(){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin();
   Component::name = "DHTSensor";
   pinMode(pinNumber, INPUT);
}

DHTSensor::DHTSensor(int pinNumber, uint8_t updatingInteval) : pinNumber(pinNumber), Sensor(){
   this->dht = new DHT(pinNumber, DHT11);
   dht->begin(updatingInteval);
   Component::name = "DHTSensor";
}

void DHTSensor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         Serial.println("MEASURE");
         sendData();
         break;

      default:
         break;
   }
}

void DHTSensor::sendData(SensorValue sensorValue){
   Util util;
   Converter converter;

   SensorValue sensorValues[2] = { TEMPERATURE, HUMIDITY };

   float currentTemerature = getTemerature();
   if(currentTemerature != currentTemerature)
      currentTemerature = 0;
   float currentHumidity = getHumidity();
   if(currentHumidity != currentHumidity)
      currentHumidity = 0;
   int values[2] = {currentTemerature, currentHumidity}; 

   char valueStringRaw[50];
   int valueStringSize;
   util.generateValueString(valueStringRaw, &valueStringSize, id, sensorValues, 2, values, 2);
   char valueString[valueStringSize];
   util.splitCharArr(valueStringRaw, valueString, 0, valueStringSize);
   util.sendStringSerial(valueString, valueStringSize);
}

float DHTSensor::getTemerature(){ return this->dht->readTemperature(); }
float DHTSensor::getHumidity(){ return this->dht->readHumidity(); }