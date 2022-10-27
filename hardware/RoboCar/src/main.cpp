#include <Arduino.h>
#include <Robot.h>

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

/*
MotorL293D FLMotor(FLMotorEnablePin, FLMotorInput1Pin, FLMotorInpu2Pin);
MotorL293D BLMotor(BLMotorEnablePin, BLMotorInput1Pin, BLMotorInpu2Pin);
MotorL293D FRMotor(FRMotorEnablePin, FRMotorInput1Pin, FRMotorInpu2Pin);
MotorL293D BRMotor(BRMotorEnablePin, BRMotorInput1Pin, BRMotorInpu2Pin);*/

Robot robot;

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

const float minDistance = 30.0f;

void setup() {
  Serial.begin(9600);
  Serial3.begin(115200);

  robot.setForwardLeftMotor(FLMotorEnablePin, FLMotorInput1Pin, FLMotorInpu2Pin);
  robot.setBackLeftMotor(BLMotorEnablePin, BLMotorInput1Pin, BLMotorInpu2Pin);
  robot.setForwardRightMotor(FRMotorEnablePin, FRMotorInput1Pin, FRMotorInpu2Pin);
  robot.setBackRightMotor(BRMotorEnablePin, BRMotorInput1Pin, BRMotorInpu2Pin);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(photoResistorPin, INPUT);
  pinMode(tiltSensorPin, INPUT);
}

void loop() {
  if(Serial3.available() > 0) {
    // read the incoming byte:
    char incomingByte = (char)Serial3.read();

    // say what you got:
    Serial.println(incomingByte);
  }
}