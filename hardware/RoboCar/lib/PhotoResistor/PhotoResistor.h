#ifndef PhotoResistor_H
#define PhotoResistor_H

#include "Sensor.h"
#include "SensorValue.h"

class PhotoResistor : public Sensor{
private:
    const int pinNumber;
public:
    PhotoResistor(int pinNumber);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData(SensorValue sensorValue=LIGHT_INTENSITY) override;
    int getValue();
};

#endif