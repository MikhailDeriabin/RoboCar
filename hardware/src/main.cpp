#include <Arduino.h>
#include <MotorL293D.h>

const int trigPin = 3;
const int echoPin = 2;

const int FLMotorEnablePin = 29;
const int FLMotorInput1Pin = 33;
const int FLMotorInpu2Pin = 31;
const int BLMotorEnablePin = 23;
const int BLMotorInput1Pin = 27;
const int BLMotorInpu2Pin = 25;

const int FRMotorEnablePin = 28;
const int FRMotorInput1Pin = 32;
const int FRMotorInpu2Pin = 30;
const int BRMotorEnablePin = 22;
const int BRMotorInput1Pin = 26;
const int BRMotorInpu2Pin = 24;

float duration, distance;

MotorL293D FLMotor(FLMotorEnablePin, FLMotorInput1Pin, FLMotorInpu2Pin);
MotorL293D BLMotor(BLMotorEnablePin, BLMotorInput1Pin, BLMotorInpu2Pin);
MotorL293D FRMotor(FRMotorEnablePin, FRMotorInput1Pin, FRMotorInpu2Pin);
MotorL293D BRMotor(BRMotorEnablePin, BRMotorInput1Pin, BRMotorInpu2Pin);

void moveForward();
void stopMoving();

const float minDistance = 30.0f;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*0.0343)/2;
  Serial.print("Distance: ");
  Serial.println(distance);
  
  if(distance > minDistance)
    moveForward();
  else
    stopMoving();

  delay(10);
}

void moveForward(){
  FLMotor.spinCounter();
  BLMotor.spinCounter();
  FRMotor.spinClock();
  BRMotor.spinClock();
}

void stopMoving(){
  FLMotor.stopSpin();
  BLMotor.stopSpin();
  FRMotor.stopSpin();
  BRMotor.stopSpin();
}