#ifndef SENSOR_H
#define SENSOR_H

#include "Component.h"

class Sensor : public Component{
public:
    Sensor();
    virtual void sendData() = 0;
};

#endif