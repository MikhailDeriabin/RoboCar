#include <Arduino.h>
#include <Robot.h>
#include <DHTSensor.h>
#include <TiltSensor.h>
#include <USSensor.h>
#include <PhotoResistor.h>
#include <Component.h>
#include <Converter.h>
#include <Util.h>
#include <ServoMotor.h>
#include <Servo.h>

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

const int trigPin = 13;
const int echoPin = 12;

const int servoPin = 9;

const int dhtPin = 2;
//const int vibrationSensorPin = A9; //misfunctioning
const int tiltSensorPin = 3;
const int photoResistorPin = A8;
const int sensorLampPin = 4;

Servo servo;

Robot robot;
USSensor usSensor(trigPin, echoPin);
DHTSensor dhtSensor(dhtPin);
TiltSensor tiltSensor(tiltSensorPin);
PhotoResistor photoResistor(photoResistorPin);
ServoMotor servoMotor(&servo);

const int componentsCount = 6;
Component* components[componentsCount] = { &robot, &usSensor, &dhtSensor, &tiltSensor, &photoResistor, &servoMotor };


void setComponentsIds(Component* components[], int componentsSize);
void clearCharArray(char arr[], int arrSize);
void sendCommand(char str[], int strSize);

void setup() {
  Serial.begin(9600);
  Serial3.begin(115200);
  servo.attach(servoPin);

  robot.setForwardLeftMotor(FLMotorEnablePin, FLMotorInput1Pin, FLMotorInpu2Pin);
  robot.setBackLeftMotor(BLMotorEnablePin, BLMotorInput1Pin, BLMotorInpu2Pin);
  robot.setForwardRightMotor(FRMotorEnablePin, FRMotorInput1Pin, FRMotorInpu2Pin);
  robot.setBackRightMotor(BRMotorEnablePin, BRMotorInput1Pin, BRMotorInpu2Pin);
  robot.setServoMotor(&servoMotor);
  robot.setUSSensor(&usSensor);

  setComponentsIds(components, componentsCount);
}

const int bufferSize = 50;
char serialBuffer[bufferSize];
int serialBufferIndex = 0;

void loop() {
  if(Serial3.available() > 0) {
    char incomingChar = (char)Serial3.read();

    serialBuffer[serialBufferIndex] = incomingChar;
    serialBufferIndex++;

    if(incomingChar == ';'){
      sendCommand(serialBuffer, serialBufferIndex);
      clearCharArray(serialBuffer, bufferSize);
      serialBufferIndex = 0;
    }
  }
}

void setComponentsIds(Component* components[], int componentsSize){
  for(int i=0; i<componentsSize; i++)
    components[i]->setId(i); 
}

void clearCharArray(char arr[], int arrSize){
  for(int i=0; i<arrSize; i++){
    arr[i] = -1;
  }
}

void sendCommand(char str[], int strSize){
  Converter converter;
  Util util;
  char idRaw[10];
  int deviceId = -1;
  int i = 0;
  int previousBreakPoint = 0;
  for(; i<strSize; i++){   
    if(str[i] == '_'){
      deviceId = converter.charArrToInt(idRaw, i);
      previousBreakPoint = i;
      break;
    }
    idRaw[i] = str[i];
  }

  char statusRaw[10]; 
  int statusInt = -1;

  i++;
  for(int j=0; j<strSize; j++){
    if(str[i] == ':' || i == strSize-1){      
      statusInt = converter.charArrToInt(statusRaw, i-previousBreakPoint-1);
      previousBreakPoint = i;
      break;
    }
    statusRaw[j] = str[i];
    i++;
  }
  Status status = static_cast<Status>(statusInt);

  i++;
  char valueRaw[10];

  if(i < strSize){
    for(int j=0; j<strSize; j++){
      if(str[i] == ';')    
        break;
          
      valueRaw[j] = str[i];
      i++;
    }
  }
  
  int valueSize = i-previousBreakPoint-1;
  char value[valueSize];
  util.splitCharArr(valueRaw, value, 0, valueSize-1);

  components[deviceId]->giveCommand(status, value, valueSize);
}