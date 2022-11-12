// @ts-ignore
import mqtt from "precompiled-mqtt";
import {Command} from "./CommandEnums";
import {TopicEnums} from "./TopicEnums";
import {IPointsInfo} from "../../types/types";
import {SensorValue} from "./SensorsValuesEnums";


export class ControlCarApi {

   // static instance: ControlCarApi;
  private static instance: ControlCarApi;
  private readonly client: any;
  private coordinatesArray: IPointsInfo[] = [];

  private constructor() {
    this.client = mqtt.connect('ws://78.27.125.143:8883');
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
      this.client.publish('presence', 'Hello mqtt');
      this.client.publish('presence', 'Hello mqtt');
      this.client.publish('presence', 'Hello mqtt');
      this.client.publish('presence', 'loh suka');
      this.client.publish('presence', 'Hello Hello');
      this.client.publish('presence', 'Hello mqtt');

      this.client.on('message',(topic:any, message: {toString: () => any}) =>{
        console.log(message.toString());
      })
    }
  })
})
}

  measureCoordinates() {
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
        // this.coordinatesArray.push(coordinates);
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
    const result = [];
    for(let i=0; i<msgArr.length; i++){
      const currentMsg = msgArr[i];

      // find indexes of : and ; in the message string (from US sensor)
      let colonIndex, semicolonIndex;
      for(let j=0; j<currentMsg.length; j++){
        if(currentMsg.charAt(j) === ":")
          colonIndex = j;
        if(currentMsg.charAt(j) === ";")
          semicolonIndex = j;
      }
      //get direction (DISTANCE_FRONT, DISTANCE_LEFT, DISTANCE_RIGHT) of distance and distance itself from the message string
      const sensorValueStr = currentMsg.slice(0, colonIndex);
      if(colonIndex !== undefined){
        const valueStr = currentMsg.slice(colonIndex+1, semicolonIndex);
        const sensorValue = parseInt(sensorValueStr);
        const value = parseInt(valueStr);
        //put distances (=coordinates) to the result arr in the form [FRONT, LEFT, RIGHT]
        switch (sensorValue) {
          case SensorValue.DISTANCE_FRONT:
            result[0] = value;
            break;
          case SensorValue.DISTANCE_LEFT:
            result[1] = value;
            break;
          case SensorValue.DISTANCE_RIGHT:
            result[2] = value;
            break;
        }
      }
      }
    return result;
  }




// client.on('message', function (topic: any, message: { toString: () => any; }) {
//   // message is Buffer
//   console.log(message.toString());
//   client.end(); //this method disconnect client from broker completely, unsubscribe("topic") is better
// })


}

// export default new ControlCarApi();
