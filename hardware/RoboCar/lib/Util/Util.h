#ifndef UTIL_H
#define UTIL_H

#include <Component.h>
#include <SensorValue.h>

class Util{
public:
    Util();
    char* splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex=0);
    char* concatCharArr(char* arr1, char* arr2, char* arrTo, int arr1Size, int arr2Size);
    bool areCharArrSame(char* arr1, char* arr2, int arr1Size, int arr2Size);

    Component* getDeviceIdFromTopic(char* clientId, char* topic, Component* components[], int size);

    void generateValueStr(int deviceId, char strTo[], int* strSize);
    void generateValueStringPair(SensorValue sensorValue, int value, char strTo[], int* strSize);
    void generateValueString(char stringTo[], int* stringSize, int deviceId, SensorValue sensorValues[], int sensorValuesSize, int values[], int valuesSize);
    void sendStringSerial(char string[], int stringSize);
};

#endif