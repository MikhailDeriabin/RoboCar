// @ts-ignore
import mqtt from "precompiled-mqtt";
import {Command} from "./CommandEnums";
import {TopicEnums} from "./TopicEnums";
import {CoordsDistanceObject} from "../types/types";
import {SensorValue} from "./SensorsValuesEnums";
import {controlCarPath} from "../data/paths";


//  todo string to decode  ['1:21,2:39;', '3:1023;', '4:1;', '8:24;', '6:7;', '7:35;']
//

export class ControlCarApi {

  private static instance: ControlCarApi;
  private readonly client: any;

  // private coordinatesArray: IPointsInfo[] = [];
  private coordinatesArray: CoordsDistanceObject[] = [];

  doneObject : any;

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

    this.client.subscribe(TopicEnums.DhtSensor.toString() + '/out')
    this.sendCommand(TopicEnums.DhtSensor, Command.MEASURE,);
    let msgCount = 0;
    let dhtValue = null;
    const messages: string[] = [];
    this.client.on("message", (topic: TopicEnums, payload: any) => {
      // const msg = payload.toString();
      const msg = payload + '';
      messages.push(msg);
      msgCount++;
      if(msgCount === 1){
        this.client.unsubscribe(TopicEnums.DhtSensor.toString() + '/out');
        dhtValue = messages[0];
        // console.log(dhtValue);
      }
      // const msgObject = JSON.parse(msg);
      // console.log(msgObject);
      // console.log(msg)
      // this.client.unsubscribe(TopicEnums.DhtSensor);
      }
    );
  }

  measureLightIntensity(){
    this.client.subscribe(TopicEnums.PhotoResistor.toString() + '/out')
    this.sendCommand(TopicEnums.PhotoResistor, Command.MEASURE);

    let msgCount = 0;
    let photoResistorValue = null;
    const messages: string[] = [];

    this.client.on("message", (topic: TopicEnums, payload: any) => {
        // const msg = payload.toString()
        const msg = payload + '';
        messages.push(msg);
        msgCount++;

        if(msgCount === 2){
          this.client.unsubscribe(TopicEnums.PhotoResistor.toString() + '/out');
          photoResistorValue = messages[1];
          // console.log(photoResistorValue);
        }
      }
    );
  }


  measureIsTilted(){
    this.client.subscribe(TopicEnums.TiltSensor.toString() + '/out')
    this.sendCommand(TopicEnums.TiltSensor, Command.MEASURE);
    let msgCount = 0;
    let isTilted = null;
    const messages: string[] = [];
    this.client.on("message", (topic: TopicEnums, payload: any) => {
        const msg = payload + '';
        messages.push(msg);
        msgCount++;

        if(msgCount === 3){
          this.client.unsubscribe(TopicEnums.TiltSensor.toString() + '/out');
          isTilted = messages[2];
          // console.log(isTilted);
        }

        // const msgObject = JSON.parse(msg);
        // console.log(msgObject);
        // console.log(msgObject)
        // this.client.unsubscribe(TopicEnums.TiltSensor);
      }
    );
  }






  measureCoordinates() {
    // const  coordinatesArray: IPointsInfo[] = [];
    this.client.subscribe(TopicEnums.UsSensorTopic.toString() + '/out');
    this.sendCommand(TopicEnums.RobotTopic, Command.GET_COORDINATES);
    let msgCount = 0;
    const messages: string[] = [];
    this.client.on("message", (topic: TopicEnums, payload: any) => {
      const msg = payload.toString();
      messages.push(msg);
      msgCount++;
      if(msgCount === 6){
        // this.client.unsubscribe(TopicEnums.UsSensorTopic);
        this.client.unsubscribe(TopicEnums.UsSensorTopic.toString() + '/out');
        const coordinates = this.generateCoordsArr(messages);
        console.log("cords",coordinates)

        console.log(messages);

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


  // sendCommand(topic: TopicEnums, command: Command, param?: Number) {
  sendCommand(topic: any, command: any, param?: Number) {
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
