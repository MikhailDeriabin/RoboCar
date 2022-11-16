// @ts-ignore
import mqtt from "precompiled-mqtt";
import {Command} from "./CommandEnums";
import {TopicEnums} from "./TopicEnums";
import {CoordsDistanceObject, IMapDataPostWithName, IMapDataPostWithoutName} from "../types/types";
import {SensorValue} from "./SensorsValuesEnums";
import {controlCarPath} from "../data/paths";
import {CurrentDirection} from "./CurrentDirectionEnums";
import {DataBaseApi} from "./DataBaseApi";

export class ControlCarApi2 {

  private dataBaseApi: DataBaseApi;

  private static instance: ControlCarApi2;
  private readonly client: any;

  public points = [];
  private reqDataWithoutName: IMapDataPostWithoutName | null = null;

  public currentDirection:CurrentDirection = CurrentDirection.FORWARD;
  public isMeasurementStarted = false;
  public readyToBeSent = false;

  public mapName: string|null = null;
  private width: number = 0;
  private height: number = 0;
  private robotLong: number = 25;

  // private coordinatesArray: CoordsDistanceObject[] = [];

  // doneObject : any;

  private constructor() {

    this.client = mqtt.connect(controlCarPath);
    this.dataBaseApi = new DataBaseApi();

  }

  public static getInstance(): ControlCarApi2 {

    if (!ControlCarApi2.instance) {
      ControlCarApi2.instance = new ControlCarApi2();
    }
    return ControlCarApi2.instance;
  }

   measure() {
    const topics = [ TopicEnums.RobotTopic, TopicEnums.UsSensorTopic, TopicEnums.DhtSensor, TopicEnums.TiltSensor, TopicEnums.PhotoResistor ];
    for(let i=1; i<topics.length; i++)
      this.client.subscribe(topics[i] + "/out");

    for(let i=2; i<topics.length; i++)
      this.sendCommand(topics[i], Command.MEASURE);

    this.sendCommand(TopicEnums.RobotTopic, Command.GET_COORDINATES);
    let msgCount = 0;
    let distances = {};
    let currentPoint = {};

    this.client.on("message", (topic: string, payload: any) => {
      const msg = payload.toString();
      msgCount++;

      const valObj = this.sensorStrToObj(msg);

      if(topic === TopicEnums.UsSensorTopic+"/out")
        distances = Object.assign(distances, valObj);
      else
        currentPoint = Object.assign(currentPoint, valObj);


      if(msgCount === 6){
        for(let i=1; i<topics.length; i++)
          this.client.unsubscribe(topics[i] + "/out");

        // @ts-ignore
        const xYObj = this.convertToXYForm(parseInt(distances["DISTANCE_FRONT"]), parseInt(distances["DISTANCE_LEFT"]), parseInt(distances["DISTANCE_RIGHT"]));
        currentPoint = Object.assign(currentPoint, xYObj);

        // @ts-ignore
        this.points.push(currentPoint);
        currentPoint = {};
        console.log(this.points);
      }
    });
  }

  async saveMeasureResult(){
    let reqDataWithName: IMapDataPostWithName;
    if(this.reqDataWithoutName){
      if(this.mapName){
        reqDataWithName = {
          ...this.reqDataWithoutName,
          name: this.mapName
        }
        try {
          const result = await this.dataBaseApi.createNewMap(reqDataWithName);
          console.log(result)
        }
        catch (e){
          alert(e);
        }
      }
      }

    else{
      // alert('problems with db api')
      console.log('reqDataWithoutName is empty')
    }

  }

  async startStopMeasurementHandler(){
    if(!this.isMeasurementStarted){
      this.isMeasurementStarted = true;

      this.client.subscribe(TopicEnums.UsSensorTopic + "/out");
      this.sendCommand(TopicEnums.RobotTopic, Command.GET_COORDINATES);

      let distances = {};
      let msgCount = 0;

      this.client.on("message", (topic: any, payload: { toString: () => any; }) => {
        const msg = payload.toString();
        msgCount++;
        const valObj = this.sensorStrToObj(msg);
        distances = Object.assign(distances, valObj);

        if(msgCount === 3){
          this.client.unsubscribe(TopicEnums.UsSensorTopic + "/out");
          // @ts-ignore
          this.width = parseInt(distances["DISTANCE_LEFT"]) + parseInt(distances["DISTANCE_RIGHT"]);
          // @ts-ignore
          this.height = parseInt(distances["DISTANCE_FRONT"]) + this.robotLong ;
        }
      });

      this.currentDirection = CurrentDirection.FORWARD;
    } else {

      await this.saveMeasureResult();

      this.isMeasurementStarted = false;

      console.log(this.points);
      console.log(this.width,this.height);

      this.points = [];
      this.mapName = null;
      this.reqDataWithoutName = null;
    }
  }


  moveForward() {
    this.sendCommand(TopicEnums.RobotTopic, Command.MOVE_FORWARD);
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

   convertToXYForm(frontDistance: number, leftDistance: number, rightDistance: number){
    const coords:any = {
    };
    switch (this.currentDirection) {
      case CurrentDirection.FORWARD:
        coords.x = leftDistance;
        coords.y = this.height - frontDistance;
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
        coords.x = this.width-frontDistance;
        coords.y = rightDistance;
        break;
    }

    return coords;
  }

  sensorStrToObj(str:any){
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
            currentKey = this.convertIntToStrSensorEnum(currentKey);
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

