#ifndef CONVERTER_H
#define CONVERTER_H

/**
 * @brief Class with data types parsing methods.
 */
class Converter{
public:
    Converter();
    /**
     * @brief Convert char[] to float.
     * 
     * @param arr char[] to be converted.
     * @param arrSize size of the arr parameter.
     * @return float converted value
     */
    float charArrToFloat(char arr[], int arrSize);
    int charArrToInt(char arr[], int arrSize);
    char* intToCharArr(int num, char arrTo[], int* arrSize);
    char* floatToCharArr(float num, char arrTo[], int* arrSize);
};

#endif