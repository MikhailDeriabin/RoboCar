#include "PhotoResistor.h"
#include "Arduino.h"
#include <Status.h>
#include <Converter.h>
#include <Component.h>
#include <Util.h>
#include "Sensor.h"
#include <CommandValue.h>
#include "SensorValue.h"

PhotoResistor::PhotoResistor(int pinNumber) : pinNumber(pinNumber), Sensor(){
   Component::name = "PhotoResitor";
   pinMode(pinNumber, INPUT);
}

void PhotoResistor::giveCommand(Status status, char* value, int valueSize){
   switch (status){
      case MEASURE:
         sendData();
         break;

      default:
         break;
   }
}

void PhotoResistor::sendData(SensorValue sensorValue){
   Util util;
   Converter converter;

   SensorValue sensorValues[1] = { LIGHT_INTENSITY };

   int currentLightIntens = getValue();
   if(currentLightIntens != currentLightIntens)
      currentLightIntens = 0;

    int values[1] = { currentLightIntens };

    //0_23:345;
    char valueStringRaw[50];
    int valueStringSize;
    util.generateValueString(valueStringRaw, &valueStringSize, id, sensorValues, 1, values, 1);
    char valueString[valueStringSize];
    util.splitCharArr(valueStringRaw, valueString, 0, valueStringSize);
    
    util.sendStringSerial(valueString, valueStringSize);
}

int PhotoResistor::getValue(){ 
    //0 -light, 700-800 semi dark, 1023 - dark
    return analogRead(pinNumber);
}