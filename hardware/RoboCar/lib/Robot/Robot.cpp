#include <Arduino.h>
#include "Robot.h"
#include <MotorL293D.h>
#include <Converter.h>

Robot::Robot(){
}

void Robot::setForwardLeftMotor(const int enablePin, const int input1Pin, const int input2Pin){
    FLMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
    FLMotor->turnOn();
}
void Robot::setForwardRightMotor(const int enablePin, const int input1Pin, const int input2Pin){
    FRMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
    FRMotor->turnOn();
}
void Robot::setBackLeftMotor(const int enablePin, const int input1Pin, const int input2Pin){
    BLMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
    BLMotor->turnOn();
}
void Robot::setBackRightMotor(const int enablePin, const int input1Pin, const int input2Pin){
    BRMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
    BRMotor->turnOn();
}

void Robot::setServoMotor(ServoMotor* servoMotor){ this->servoMotor = servoMotor; }
void Robot::setUSSensor(USSensor* usSensor){ this->usSensor = usSensor; }

void Robot::giveCommand(Status status, char* value, int valueSize){
  int valueInt = -1;
  if(valueSize > 0){
    Converter converter;
    valueInt = converter.charArrToInt(value, valueSize);
  }

   switch (status){
      case MOVE_FORWARD:
        moveForward(valueInt);
        break;
      
      case MOVE_BACK:
        moveBack(valueInt);
        break;

      case TURN_LEFT:
        turnLeft(valueInt);
        break;

      case TURN_RIGHT:
        turnRight(valueInt);
        break;

      case STOP_MOVING:
        stopMoving();
        break;

      case GET_COORDINATES:
        getCoordinates();
        break;

      default:
         break;
   }
}

void Robot::moveForward(int duration){
  FLMotor->spinCounter();
  BLMotor->spinCounter();
  FRMotor->spinClock();
  BRMotor->spinClock();
  if(duration != -1){
    delay(duration);
    stopMoving();
  }
}

void Robot::moveBack(int duration){
  FLMotor->spinClock();
  BLMotor->spinClock();
  FRMotor->spinCounter();
  BRMotor->spinCounter();
  if(duration != -1){
    delay(duration);
    stopMoving();
  }
}

void Robot::turnLeft(int duration){
  FLMotor->spinClock();
  BLMotor->spinClock();
  FRMotor->spinClock();
  BRMotor->spinClock();
  if(duration != -1)
    delay(duration);
   else
    delay(284); 
  stopMoving();
}

void Robot::turnRight(int duration){
  FLMotor->spinCounter();
  BLMotor->spinCounter();
  FRMotor->spinCounter();
  BRMotor->spinCounter();
  if(duration != -1)
    delay(duration);
   else
    delay(284); 
  stopMoving();
}

void Robot::stopMoving(){
  FLMotor->stopSpin();
  BLMotor->stopSpin();
  FRMotor->stopSpin();
  BRMotor->stopSpin();
}

void Robot::getCoordinates(){
  int measureDelay = 150;
  int turnDelay = 200;

  servoMotor->turnOnAngle(0);
  delay(turnDelay);
  usSensor->sendData(DISTANCE_RIGHT);
  delay(measureDelay);

  servoMotor->turnOnAngle(90);
  delay(turnDelay);
  usSensor->sendData(DISTANCE_FRONT);
  delay(measureDelay);

  servoMotor->turnOnAngle(180);
  delay(turnDelay);
  usSensor->sendData(DISTANCE_LEFT);
  delay(measureDelay);

  servoMotor->turnOnAngle(90);
}