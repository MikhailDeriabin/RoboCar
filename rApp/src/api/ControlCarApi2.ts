// @ts-ignore
import mqtt from "precompiled-mqtt";
import {Command} from "./CommandEnums";
import {TopicEnums} from "./TopicEnums";
import {CoordsDistanceObject} from "../types/types";
import {SensorValue} from "./SensorsValuesEnums";
import {controlCarPath} from "../data/paths";
import {CurrentDirection} from "./CurrentDirectionEnums";

export class ControlCarApi2 {

  private static instance: ControlCarApi2;
  private readonly client: any;

  public points = [];

  private coordinatesArray: CoordsDistanceObject[] = [];

  doneObject : any;

  private constructor() {

    this.client = mqtt.connect(controlCarPath);
  }

  public static getInstance(): ControlCarApi2 {

    if (!ControlCarApi2.instance) {
      ControlCarApi2.instance = new ControlCarApi2();
    }
    return ControlCarApi2.instance;
  }

  measureCoordinates() {
    const robotTopic = "1/0";
    const usTopic = "1/1";
    const dhtTopic = "1/2";
    const tiltTopic = "1/3";
    const photoTopic = "1/4";

    const topics = [ robotTopic, usTopic, dhtTopic, tiltTopic, photoTopic ];
    for(let i=1; i<topics.length; i++)
      this.client.subscribe(topics[i] + "/out");

    for(let i=2; i<topics.length; i++)
      this.sendCommand(topics[i], Command.MEASURE);

    this.sendCommand(robotTopic, Command.GET_COORDINATES);
    let msgCount = 0;
    let distances = {};
    let currentPoint = {};

    this.client.on("message", (topic: string, payload: { toString: () => any; }) => {
      const msg = payload.toString();
      msgCount++;

      const valObj = this.sensorStrToObj(msg);

      if(topic === usTopic+"/out")
        distances = Object.assign(distances, valObj);
      else
        currentPoint = Object.assign(currentPoint, valObj);


      if(msgCount === 6){
        for(let i=1; i<topics.length; i++)
          this.client.unsubscribe(topics[i] + "/out");

        // @ts-ignore
        const xYObj = this.convertToXYForm(parseInt(distances["DISTANCE_FRONT"]), parseInt(distances["DISTANCE_LEFT"]), parseInt(distances["DISTANCE_RIGHT"]), 300, 600, CurrentDirection.FORWARD);
        currentPoint = Object.assign(currentPoint, xYObj);

        // @ts-ignore
        this.points.push(currentPoint);
        currentPoint = {};
        console.log(this.points);
      }
    });
  }



  moveForward() {
    this.sendCommand(TopicEnums.RobotTopic, Command.MOVE_FORWARD);
  }
  moveBack() {
    this.sendCommand(TopicEnums.RobotTopic, Command.MOVE_BACK);
  }

  turnLeft() {
    this.sendCommand(TopicEnums.RobotTopic, Command.TURN_LEFT);
  }

  turnRight() {
    this.sendCommand(TopicEnums.RobotTopic, Command.TURN_RIGHT);
  }

  turnLeftMS() {
    const durationMs = 10;
    this.sendCommand(TopicEnums.RobotTopic, Command.TURN_LEFT, durationMs);
  }

  turnRightMS() {
    const durationMs = 10;
    this.sendCommand(TopicEnums.RobotTopic, Command.TURN_RIGHT, durationMs);
  }

  stopMoving(){
    this.sendCommand(TopicEnums.RobotTopic, Command.STOP_MOVING);
  }


   sendCommand(topic: any, command: any, param?: any) {
    let commandStr = command;
    if(param != null && param !== "")
      commandStr += ":" + param;
    commandStr += ";";
    this.client.publish(topic, commandStr);
  }

  convertToXYForm(frontDistance: number, leftDistance: any, rightDistance: any, width: number, height: number, currentDirection: any){
    const coords: {
      x:number,
      y:number
    } = {
      x: 0,
      y: 0
    };
    switch (currentDirection) {
      case CurrentDirection.FORWARD:
        coords.x = leftDistance;
        coords.y = height-frontDistance;
        break;

      case CurrentDirection.LEFT:
        coords.x = frontDistance;
        coords.y = leftDistance;
        break;

      case CurrentDirection.BACK:
        coords.x = rightDistance;
        coords.y = frontDistance;
        break;

      case CurrentDirection.RIGHT:
        coords.x = width-frontDistance;
        coords.y = rightDistance;
        break;
    }
    return coords;
  }

  sensorStrToObj(str: string | any[]){
    const obj = {};
    let currentKey = '';
    for(let i=0; i<str.length; i++){
      if(str[i] === ':'){
        i++;
        let currentValue = '';
        for(;i<str.length; i++){
          if(str[i] === ',' || i === str.length-1){
            // @ts-ignore
            currentKey = parseInt(currentKey);
            // @ts-ignore
            currentKey = convertIntToStrSensorEnum(currentKey);
            // @ts-ignore
            obj[currentKey] = currentValue;
            currentKey = '';
            break;
          } else
            currentValue += str[i];
        }
      } else
        currentKey += str[i];
    }

    return obj;
  }

  convertIntToStrSensorEnum(intVal: any) {
    switch (intVal) {
      case SensorValue.TEMPERATURE:
        return "temperature";
      case SensorValue.HUMIDITY:
        return "humidity";
      case SensorValue.LIGHT_INTENSITY:
        return "lightIntensity";
      case SensorValue.IS_TILTED:
        return "isTilted";
      case SensorValue.DISTANCE_FRONT:
        return "DISTANCE_FRONT";
      case SensorValue.DISTANCE_LEFT:
        return "DISTANCE_LEFT";
      case SensorValue.DISTANCE_RIGHT:
        return "DISTANCE_RIGHT";
    }
  }

}

