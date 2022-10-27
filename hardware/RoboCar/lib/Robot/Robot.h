#ifndef ROBOT_H
#define ROBOT_H

#include <MotorL293D.h>

class Robot : public Component{
public:
    Robot();

    void setForwardLeftMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setForwardRightMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setBackLeftMotor(const int enablePin, const int input1Pin, const int input2Pin);
    void setBackRightMotor(const int enablePin, const int input1Pin, const int input2Pin);

    void giveCommand(Status status, char* value, int valueSize) override;

    void moveForward();
    void stopMoving();
    int lol = 0;

private:
    MotorL293D* FLMotor;
    MotorL293D* BLMotor;
    MotorL293D* FRMotor;
    MotorL293D* BRMotor;
};

#endif