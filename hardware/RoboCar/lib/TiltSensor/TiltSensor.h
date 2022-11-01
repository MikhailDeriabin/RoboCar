#ifndef TiltSensor_H
#define TiltSensor_H

#include "Sensor.h"
#include "Status.h"
#include "SensorValue.h"

class TiltSensor : public Sensor{
private:
    const int pinNumber;
public:
    TiltSensor(int pinNumber);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData(SensorValue sensorValue=IS_TILTED) override;
    int getValue();
};

#endif