# RoboCar

Do not use spaces!
End every command by semicolon (;)!
Every received data from sensor will end with semicolon (;).

## MQTT instructions

### Sending command

Using Command enum.

Command_ENUM:Value; OR Command_ENUM;

Examples:
1. 11:100; //move forward for 100 ms
2. 13; // turn left 90 deg
3. 13:10; //turn left for 10 ms

Commands description:

| Command         | Description                       | Notes                                              |
| --------------- | --------------------------------- | -------------------------------------------------- |
| MOVE_FORWARD    | move forward                      | no value=move forever, value=move time in ms (INT) |
| MOVE_BACK       | move back                         | no value=move forever, value=move time in ms (INT) |
| TURN_LEFT       | turn left                         | no value=turn 90 deg, value=turn time in ms (INT)  |
| TURN_RIGHT      | turn right                        | no value=turn 90 deg, value=turn time in ms (INT)  |
| STOP_MOVING     | stop moving                       | no value needed                                    |
| GET_COORDINATES | measure robot current coordinates | no value needed                                    |
| MEASURE         | measure sensor value              | no value needed                                    |

### Receiving sensor values

Using SensorValues enum.

SENSOR_VALUE_ENUM:Value; OR SENSOR_VALUE_ENUM1:Value,SENSOR_VALUE_ENUM2:Value;

Examples:
1. 1:25,2:80; //Data from temp+hum sensor
2. 3:600; //Data from photoresistor

| Sensor Value    | Description                               |
| --------------- | ----------------------------------------- | 
| TEMPERATURE     | temperature in Celcius, INT               | 
| HUMIDITY        | humidity in %, INT                        | 
| LIGHT_INTENSITY | light intensity 0-1024, INT               | 
| IS_TILTED       | is robot tilted or not 0/1, INT           | 
| DISTANCE_FRONT  | distance in front of the robot in cm, INT |
| DISTANCE_LEFT   | distance in left of the robot in cm, INT  | 
| DISTANCE_RIGHT  | distance in right of the robot in cm, INT |

### Topics

Same as devices to which a command need to be sent.

1/0 robot
1/1 usSensor (distance)
1/2 dhtSensor (temp+hum)
1/3 tiltSensor (is tilted or not)
1/4 photoResistor (light intensity)
