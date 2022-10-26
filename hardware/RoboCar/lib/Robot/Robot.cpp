#include "Robot.h"
#include <MotorL293D.h>

Robot::Robot(){
}

void Robot::setForwardLeftMotor(const int enablePin, const int input1Pin, const int input2Pin){
    FLMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
}
void Robot::setForwardRightMotor(const int enablePin, const int input1Pin, const int input2Pin){
    BLMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
}
void Robot::setBackLeftMotor(const int enablePin, const int input1Pin, const int input2Pin){
    BLMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
}
void Robot::setBackRightMotor(const int enablePin, const int input1Pin, const int input2Pin){
    BRMotor = &MotorL293D(enablePin, input1Pin, input2Pin);
}

void Robot::moveForward(){
  FLMotor->spinCounter();
  BLMotor->spinCounter();
  FRMotor->spinClock();
  BRMotor->spinClock();
}

void Robot::stopMoving(){
  FLMotor->stopSpin();
  BLMotor->stopSpin();
  FRMotor->stopSpin();
  BRMotor->stopSpin();
}