#include "ServoMotor.h"
#include "Arduino.h"
#include "Converter.h"

ServoMotor::ServoMotor(Servo* servo){
    this->servo = servo;
    this->servo->write(83);
}

void ServoMotor::giveCommand(Status status, char* value, int valueSize){
    int valueInt = -1;
    if(valueSize > 0){
        Converter converter;
        valueInt = converter.charArrToInt(value, valueSize);
    }
    switch (status){
        case TURN_ON_ANGLE:
            Serial.println("TURN_ON_ANGLE");
            turnOnAngle(valueInt);
            break;

        default:
            break;
    }
}

int ServoMotor::getCurrentAngle(){ return currentAngle; }

//0 = right, 90 = forward, 180 = left
void ServoMotor::turnOnAngle(int angle){
    currentAngle = angle;

    float errorCoeff = 0.92f;
    int servoAngle = angle * errorCoeff;    
    if(angle >= 180)
        servoAngle = 180;
    else if(angle <= 0)
        servoAngle = 0;
    
    servo->write(servoAngle);
}