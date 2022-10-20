#include <Arduino.h>
#include <MotorL293D.h>

const int trigPin = 13;
const int echoPin = 12;

const int servoPin = 11;

const int FLMotorEnablePin = 33;
const int FLMotorInput1Pin = 31;
const int FLMotorInpu2Pin = 29;
const int BLMotorEnablePin = 27;
const int BLMotorInput1Pin = 25;
const int BLMotorInpu2Pin = 23;

const int FRMotorEnablePin = 32;
const int FRMotorInput1Pin = 30;
const int FRMotorInpu2Pin = 28;
const int BRMotorEnablePin = 26;
const int BRMotorInput1Pin = 24;
const int BRMotorInpu2Pin = 22;

const int dhtPin = 2;
//const int vibrationSensorPin = A9; //misfunctioning
const int tiltSensorPin = 3;
const int photoResistorPin = A8;
const int sensorLampPin = 4;

float duration, distance;

MotorL293D FLMotor(FLMotorEnablePin, FLMotorInput1Pin, FLMotorInpu2Pin);
MotorL293D BLMotor(BLMotorEnablePin, BLMotorInput1Pin, BLMotorInpu2Pin);
MotorL293D FRMotor(FRMotorEnablePin, FRMotorInput1Pin, FRMotorInpu2Pin);
MotorL293D BRMotor(BRMotorEnablePin, BRMotorInput1Pin, BRMotorInpu2Pin);

void photoResistorSensor(){
  //0 -light, 700-800 semi dark, 1023 - dark
  int value = analogRead(photoResistorPin);
  Serial.println(value);
  delay(250);
}

void tiltSensor(){
  //0 = flat (is contact), 1 = tilted(no contact)
  int value = digitalRead(tiltSensorPin);
  Serial.println(value);
  delay(500);
}
/*
void vibrationSensor(){
  //290-360 idle; 0-150 vibration
  int value = analogRead(vibrationSensorPin);
  Serial.println(value);
  delay(100);
}*/


void moveForward();
void stopMoving();

const float minDistance = 30.0f;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(photoResistorPin, INPUT);
  pinMode(tiltSensorPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(sensorLampPin, HIGH);
  photoResistorSensor();
  tiltSensor();
  digitalWrite(sensorLampPin, LOW);
  delay(500);
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