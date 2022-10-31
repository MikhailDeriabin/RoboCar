#ifndef ServoMotor_H
#define ServoMotor_H

#include "Component.h"
#include "Status.h"
#include <Servo.h>

class ServoMotor: public Component{
private:
 Servo* servo;
 int currentAngle = 0;

public:
    ServoMotor(Servo* servo);
    void giveCommand(Status status, char* value, int valueSize) override;

    int getCurrentAngle();
    void turnOnAngle(int angle);
};

#endif