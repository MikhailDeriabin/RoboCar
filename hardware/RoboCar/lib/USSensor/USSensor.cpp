#include "USSensor.h"
#include "Arduino.h"
#include <Status.h>
#include <Converter.h>
#include <Component.h>
#include <Util.h>
#include "Sensor.h"
#include <CommandValue.h>
#include "SensorValue.h"

USSensor::USSensor(int trigPinNumber, int echoPinNumber) : trigPinNumber(trigPinNumber), echoPinNumber(echoPinNumber), Sensor(){
   Component::name = "USSensor";
   int trigPins[] = { trigPinNumber };
   Component::setPinMode(trigPins, 1, OUTPUT);
   int echoPins[] = { echoPinNumber };
   Component::setPinMode(echoPins, 1, INPUT);
}

void USSensor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         Serial.println("MEASURE");
         sendData();
         break;

      default:
         break;
   }
}

void USSensor::sendData(){
   Util util;
   Converter converter;

   SensorValue sensorValues[3] = { DISTANCE };

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
    /// Clears the trigPin
  digitalWrite(trigPinNumber, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPinNumber, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPinNumber, LOW);
  long duration = pulseIn(echoPinNumber, HIGH);
  return duration * 0.034 / 2;
}