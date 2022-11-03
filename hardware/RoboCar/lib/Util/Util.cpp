#include <Arduino.h>
#include <Converter.h>
#include <Util.h>
#include <Component.h>

Converter converter;

Util::Util(){}

char* Util::splitCharArr(char arr[], char arrTo[], int firstIndex, int lastIndex, int arrToStartIndex){
    int j = arrToStartIndex;
    for(int i=firstIndex; i<=lastIndex; i++){
        arrTo[j] = arr[i];
        j++;
    }

    return arrTo;
}

char* Util::concatCharArr(char* arr1, char* arr2, char* arrTo, int arr1Size, int arr2Size){
    int i;
    for(i=0; i<arr1Size; i++){
        arrTo[i] = arr1[i];
    }

    for(int j=0; j<arr2Size; j++){
        i++;
        arrTo[i] = arr2[j];
    }

    return arrTo;
}

bool Util::areCharArrSame(char* arr1, char* arr2, int arr1Size, int arr2Size){
    if(arr1Size != arr2Size)
        return false;

    for(int i=0; i<arr1Size; i++){
        if(arr1[i] != arr2[i])
            return false;
    }

    return true;
}

Component* Util::getDeviceIdFromTopic(char* clientId, char* topic, Component* components[], int size){
    String topicStart = clientId;
    topicStart += "/";
    for(int i=0; i<size; i++){
        String wholeTopic = topicStart + i;
        if(wholeTopic == topic){
            return components[i];
        }
    }
    return nullptr;
}

void Util::generateValueStr(int deviceId, char strTo[], int* strSize){
    char deviceIdRaw[10];
    converter.intToCharArr(deviceId, deviceIdRaw, strSize);
    splitCharArr(deviceIdRaw, strTo, 0, *strSize);
}
void Util::generateValueStringPair(SensorValue sensorValue, int value, char strTo[], int* strSize){
    char sensorValueRaw[10];
    int sensorValueSize;
    converter.intToCharArr(sensorValue, sensorValueRaw, &sensorValueSize);

    char valueChar[10];
    int valueCharSize;
    converter.intToCharArr(value, valueChar, &valueCharSize);

    *strSize = sensorValueSize + valueCharSize + 1;
    int strToIndex = 0;
    for(int i=0; i<sensorValueSize; i++){
        strTo[strToIndex] = sensorValueRaw[i];
        strToIndex++;
    }
    strTo[strToIndex] = ':';
    strToIndex++;
    for(int i=0; i<valueCharSize; i++){
        strTo[strToIndex] = valueChar[i];
        strToIndex++;
    }
}
void Util::generateValueString(char stringTo[], int* stringSize, int deviceId, SensorValue sensorValues[], int sensorValuesSize, int values[], int valuesSize){
    char valueStringRaw[50];
    int valueStringRawIndex = 0;

    char deviceIdRaw[10];
    int deviceIdSize;
    converter.intToCharArr(deviceId, deviceIdRaw, &deviceIdSize);
    for(int i=0; i<deviceIdSize; i++){
        valueStringRaw[valueStringRawIndex] = deviceIdRaw[i];
        valueStringRawIndex++;
    }
    valueStringRaw[valueStringRawIndex] = '_';
    valueStringRawIndex++;

    for(int i=0; i<sensorValuesSize; i++){
        char pairRaw[10];
        int pairSize;
        generateValueStringPair(sensorValues[i], values[i], pairRaw, &pairSize);
        for(int i=0; i<pairSize; i++){
            valueStringRaw[valueStringRawIndex] = pairRaw[i];
            valueStringRawIndex++;
        }
        if(i != sensorValuesSize-1){
            valueStringRaw[valueStringRawIndex] = ',';
            valueStringRawIndex++;
        }
    }

    valueStringRaw[valueStringRawIndex] = ';';
    valueStringRawIndex++;

    splitCharArr(valueStringRaw, stringTo, 0, valueStringRawIndex);
    *stringSize = valueStringRawIndex;
}
void Util::sendStringSerial(char* string, int stringSize){
    for(int i=0; i< stringSize; i++)
        Serial3.write((byte)string[i]);
}