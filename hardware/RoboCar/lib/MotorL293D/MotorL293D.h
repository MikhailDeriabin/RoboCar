#ifndef MOTORL293D_H
#define MOTORL293D_H

class MotorL293D{
private:
    const int enablePin, input1Pin, input2Pin;
    enum Direction { CLOCKWISE, COUNTERCLOCKWISE };
    Direction direction;
public: 
    MotorL293D(int enablePin, int input1Pin, int input2Pin);

    void turnOn(bool start=false);
    void turnOff();

    void startSpin();
    void stopSpin();
    void changeDirection();
    void spinClock();
    void spinCounter();
};

#endif