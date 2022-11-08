#ifndef COMPONENT_H
#define COMPONENT_H

#include <Status.h>

/**
 * @brief Base class for all devices connected to controller.
 * This class contains basic methods and fields, which are in use on all devices connected to a controller.
 */
class Component{
protected:
    int id;
    Status status;
    char* name;
public:
    Component();

    /**
     * @brief Main communication method.
     * This method is used for executing command on any device connected to a controller.
     * For example a command (status) for sensor may be MEASURE and sensor will measure and send that data.
     * @param status command for the device.
     * @param value parameter for status, for example turn angle, optional.
     * @param valueSize size of the value parameter.
     */
    virtual void giveCommand(Status status, char* value, int valueSize) = 0;

    /**
     * @brief Get the device id.
     * @return int device id.
     */
    int getId();
    /**
     * @brief Set the id of the device.
     * @param id id of the device.
     */
    void setId(int id);
    /**
     * @brief Get the Status of the device.
     * @return Status of the device = what device are doing at the moment.
     */
    Status getStatus();
    /**
     * @brief Set the status of the device.
     * Set Status = what device are doing at the moment.
     * @param status current status of the device.
     */
    void setStatus(Status status);
    /**
     * @brief Get the name of the device.
     * Name of the device is usually class name, such as Lamp or Sensor.
     * @return char* name of the device.
     */
    char* getName();
    /**
     * @brief Set the name of the device.
     * Name should be a class name of the component, for example Lamp.
     * @param name name of the device.
     */
    void setName(char name[]);
    /**
     * @brief Convert object to string.
     * Normally it is a class name.
     * @return char* string representation of the object.
     */
    virtual char* toString();
};

#endif