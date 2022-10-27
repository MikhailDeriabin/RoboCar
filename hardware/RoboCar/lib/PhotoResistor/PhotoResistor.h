#ifndef PhotoResistor_H
#define PhotoResistor_H

#include "Sensor.h"

class PhotoResistor : public Sensor{
private:
    const int pinNumber;
public:
    PhotoResistor(int pinNumber);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData() override;
    int getValue();
};

#endif