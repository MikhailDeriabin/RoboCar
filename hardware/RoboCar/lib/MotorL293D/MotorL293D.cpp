#include "Arduino.h"
#include "MotorL293D.h"

MotorL293D::MotorL293D(int enablePin, int input1Pin, int input2Pin) : enablePin(enablePin), input1Pin(input1Pin), input2Pin(input2Pin){
    int pins[] = {enablePin, input1Pin, input2Pin};
    for(int pin : pins){
        digitalWrite(pin, LOW);
        pinMode(pin, INPUT);
    }
    this->direction = CLOCKWISE;
}

void MotorL293D::turnOn(bool start){
    digitalWrite(enablePin, HIGH);

    if(start)
        startSpin();
}
void MotorL293D::turnOff(){
    digitalWrite(enablePin, LOW);
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, LOW); 
    stopSpin();
}

void MotorL293D::startSpin(){
    turnOn();

    if(direction == CLOCKWISE)
        spinClock();
    else if(direction == COUNTERCLOCKWISE)
        spinCounter();
}
void MotorL293D::stopSpin(){
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, LOW);
}

void MotorL293D::changeDirection(){
    turnOn();

    if(direction == CLOCKWISE){
        stopSpin();
        delay(50);
        spinCounter();
    }
        
    else if(direction == COUNTERCLOCKWISE){
        stopSpin();
        delay(50);
        spinClock();
    }                   
}
void MotorL293D::spinClock(){
    digitalWrite(input1Pin, LOW);
    digitalWrite(input2Pin, HIGH);
    direction = CLOCKWISE;
}
void MotorL293D::spinCounter(){
    digitalWrite(input1Pin, HIGH);
    digitalWrite(input2Pin, LOW);
    direction = COUNTERCLOCKWISE;
}