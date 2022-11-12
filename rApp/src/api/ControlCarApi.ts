// @ts-ignore
import mqtt from "precompiled-mqtt";
import {Command} from "./CommandEnums";
import {TopicEnums} from "./TopicEnums";
import {CoordsDistanceObject} from "../types/types";
import {SensorValue} from "./SensorsValuesEnums";
import {controlCarPath} from "../data/paths";





export class ControlCarApi {

  private static instance: ControlCarApi;
  private readonly client: any;

  // private coordinatesArray: IPointsInfo[] = [];
  private coordinatesArray: CoordsDistanceObject[] = [];

  // private coordinatesArray: number[][] = [];

  private constructor() {

    // this.client = mqtt.connect('ws://78.27.125.143:8883');
    this.client = mqtt.connect(controlCarPath);

    console.log(controlCarPath)

  }

  public static getInstance(): ControlCarApi {

    if (!ControlCarApi.instance) {
      ControlCarApi.instance = new ControlCarApi();
    }
    return ControlCarApi.instance;
  }


helloMqtt(){
  this.client.on('connect', () => {
  this.client.subscribe('presence', (err: any) => {
    if (!err) {
      this.client.publish('presence', 'Hello 1');
      this.client.publish('presence', 'Hello 2');
      this.client.publish('presence', 'Hello 3');
      this.client.publish('presence', 'hello 4');
      this.client.on('message',(topic:any, message: {toString: () => any}) =>{
        console.log(message.toString());
      })
    }
  })
})
}

  measureTempHumid(){
    this.client.subscribe(TopicEnums.DhtSensor)
    this.sendCommand(TopicEnums.DhtSensor, Command.MEASURE);
    this.client.on("message", (topic: TopicEnums, payload: any) => {
      const msg = payload.toString();
      // const msgObject = JSON.parse(msg);
      // console.log(msgObject);
      console.log(msg)
      // this.client.unsubscribe(TopicEnums.DhtSensor);
      }
    );
  }
  measureIsTilted(){
    this.client.subscribe(TopicEnums.TiltSensor)
    this.sendCommand(TopicEnums.TiltSensor, Command.MEASURE);
    this.client.on("message", (topic: TopicEnums, payload: any) => {
        const msg = payload.toString();
        // const msgObject = JSON.parse(msg);
        // console.log(msgObject);
        console.log(msg)
        // this.client.unsubscribe(TopicEnums.TiltSensor);
      }
    );
  }

  measureLightIntensity(){
    this.client.subscribe(TopicEnums.PhotoResistor)
    this.sendCommand(TopicEnums.PhotoResistor, Command.MEASURE);
    this.client.on("message", (topic: TopicEnums, payload: any) => {
        const msg = payload.toString();
        // const msgObject = JSON.parse(msg);
        // console.log(msgObject);
        console.log(msg)
        // this.client.unsubscribe(TopicEnums.PhotoResistor);
      }
    );
  }




  measureCoordinates() {
    // const  coordinatesArray: IPointsInfo[] = [];
    this.client.subscribe(TopicEnums.UsSensorTopic);
    this.sendCommand(TopicEnums.RobotTopic, Command.GET_COORDINATES);
    let msgCount = 0;
    const messages: string[] = [];
    this.client.on("message", (topic: TopicEnums, payload: any) => {
      const msg = payload.toString();
      messages.push(msg);
      msgCount++;
      if(msgCount === 3){
        this.client.unsubscribe(TopicEnums.UsSensorTopic);
        const coordinates = this.generateCoordsArr(messages);
        // console.log(coordinates)
        if(coordinates){
          this.coordinatesArray.push(coordinates);
        }
        else{
          throw new Error("Some problem with getting coordinates")
        }
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
    // clearInterval(intervalId);
    this.sendCommand(TopicEnums.RobotTopic, Command.STOP_MOVING);
  }


  sendCommand(topic: TopicEnums, command: Command, param?: Number) {
    let commandStr = command.toString();
    if(param != null)
      commandStr += ":" + param;
    commandStr += ";";
    this.client.publish(topic, commandStr);
  }

   generateCoordsArr(msgArr:string[]) {
     // const result = [];

     const coordsDistanceObject: CoordsDistanceObject = {
       distanceFront: 0,
       distanceRight: 0,
       distanceLeft: 0,
     }

     for (let i = 0; i < msgArr.length; i++) {
       const currentMsg = msgArr[i];
       // find indexes of : and ; in the message string (from US sensor)
       let colonIndex, semicolonIndex;
       for (let j = 0; j < currentMsg.length; j++) {
         if (currentMsg.charAt(j) === ":")
           colonIndex = j;
         if (currentMsg.charAt(j) === ";")
           semicolonIndex = j;
       }
       //get direction (DISTANCE_FRONT, DISTANCE_LEFT, DISTANCE_RIGHT) of distance and distance itself from the message string

         const sensorValueStr = currentMsg.slice(0, colonIndex);
         // @ts-ignore
         const valueStr = currentMsg.slice(colonIndex + 1, semicolonIndex);
         const sensorValue = parseInt(sensorValueStr);
         const value = parseInt(valueStr);
         //put distances (=coordinates) to the result arr in the form [FRONT, LEFT, RIGHT]
         switch (sensorValue) {
           case SensorValue.DISTANCE_FRONT:
             coordsDistanceObject.distanceFront = value;
             // result[0] = value;
             break;
           case SensorValue.DISTANCE_LEFT:
             coordsDistanceObject.distanceLeft = value;
             // result[1] = value;
             break;
           case SensorValue.DISTANCE_RIGHT:
             // result[2] = value;
             coordsDistanceObject.distanceRight = value;
             break;
         }
       }
       return coordsDistanceObject;
       // return result;
     }


// client.on('message', function (topic: any, message: { toString: () => any; }) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end(); //this method disconnect client from broker completely, unsubscribe("topic") is better
// })


}

// export default new ControlCarApi();
