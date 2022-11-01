#ifndef ROBOT_H
#define ROBOT_H

#include <MotorL293D.h>
#include <ServoMotor.h>
#include <USSensor.h>

class Robot : public Component{
public:
    Robot();

    void setForwardLeftMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setForwardRightMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setBackLeftMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setBackRightMotor(const int enablePin, const int input1Pin, const int input2Pin);

    void setServoMotor(ServoMotor* servoMotor);
    void setUSSensor(USSensor* usSensor);

    void giveCommand(Status status, char* value, int valueSize) override;

    void moveForward(int duration=-1);
    void moveBack(int duration=-1);
    void turnLeft(int duration=-1);
    void turnRight(int duration=-1);
    void stopMoving();

    void getCoordinates();

private:
    MotorL293D* FLMotor;
    MotorL293D* BLMotor;
    MotorL293D* FRMotor;
    MotorL293D* BRMotor;

    ServoMotor* servoMotor;
    USSensor* usSensor;
};

#endif