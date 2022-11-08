#include "USSensor.h"
#include "Arduino.h"
#include <Status.h>
#include <Converter.h>
#include <Component.h>
#include <Util.h>
#include "Sensor.h"
#include "SensorValue.h"

USSensor::USSensor(int trigPinNumber, int echoPinNumber) : trigPinNumber(trigPinNumber), echoPinNumber(echoPinNumber), Sensor(){
   Component::name = "USSensor";
   pinMode(trigPinNumber, OUTPUT);
   pinMode(echoPinNumber, INPUT);
}

void USSensor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         sendData();
         break;

      default:
         break;
   }
}

void USSensor::sendData(SensorValue sensorValue){
   Util util;
   Converter converter;

   SensorValue sensorValues[1] = { sensorValue };

   int distance = getValue();
   if(distance != distance)
      distance = 0;

    int values[1] = { distance }; 

    //0_23:345;
    char valueStringRaw[50];
    int valueStringSize;
    util.generateValueString(valueStringRaw, &valueStringSize, id, sensorValues, 1, values, 1);
    char valueString[valueStringSize];
    util.splitCharArr(valueStringRaw, valueString, 0, valueStringSize);
    util.sendStringSerial(valueString, valueStringSize);
}

int USSensor::getValue(){
  digitalWrite(trigPinNumber, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPinNumber, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinNumber, LOW);

  float duration = pulseIn(echoPinNumber, HIGH);

  return (duration*0.0343)/2;
}