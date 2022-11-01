#ifndef DHTSensor_H
#define DHTSensor_H

#include "DHT.h"
#include "Sensor.h"
#include "SensorValue.h"

class DHTSensor : public Sensor{
private:
    DHT* dht;
    const int pinNumber;
public:
    DHTSensor(int pinNumber);
    DHTSensor(int pinNumber, uint8_t updatingInterval);
    void giveCommand(Status status, char* value, int valueSize) override;
    void sendData(SensorValue sensorValue=TEMPERATURE) override;
    float getTemerature();
    float getHumidity();
};

#endif