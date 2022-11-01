#ifndef SENSOR_H
#define SENSOR_H

#include "Component.h"
#include "SensorValue.h"

class Sensor : public Component{
public:
    Sensor();
    virtual void sendData(SensorValue sensorValue=NOT_SPECIFIED) = 0;
};

#endif