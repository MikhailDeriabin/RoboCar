#ifndef USSensor_H
#define USSensor_H

#include "Sensor.h"
#include "Status.h"
#include "SensorValue.h"

class USSensor : public Sensor{
private:
    const int trigPinNumber;
    const int echoPinNumber;
public:
    USSensor(int trigPinNumber, int echoPinNumber);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData(SensorValue sensorValue=DISTANCE) override;
    int getValue();
};

#endif