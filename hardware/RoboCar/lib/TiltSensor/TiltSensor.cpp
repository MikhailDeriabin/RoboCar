#include "TiltSensor.h"
#include "Arduino.h"
#include <Status.h>
#include <Converter.h>
#include <Component.h>
#include <Util.h>
#include "Sensor.h"
#include "SensorValue.h"

TiltSensor::TiltSensor(int pinNumber) : pinNumber(pinNumber), Sensor(){
   Component::name = "PhotoResitor";
   pinMode(pinNumber, INPUT);
}

void TiltSensor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         Serial.println("MEASURE");
         sendData();
         break;

      default:
         break;
   }
}

void TiltSensor::sendData(SensorValue sensorValue){
   Util util;
   Converter converter;

   SensorValue sensorValues[1] = { IS_TILTED };

   int isTilted = getValue();
   if(isTilted != isTilted)
      isTilted = 0;

    int values[1] = { isTilted }; 

    //0_23:345;
    char valueStringRaw[50];
    int valueStringSize;
    util.generateValueString(valueStringRaw, &valueStringSize, id, sensorValues, 1, values, 1);
    char valueString[valueStringSize];
    util.splitCharArr(valueStringRaw, valueString, 0, valueStringSize);
    util.sendStringSerial(valueString, valueStringSize);
}

int TiltSensor::getValue(){ 
    //0 = flat (is contact), 1 = tilted(no contact)
    return digitalRead(pinNumber);
}