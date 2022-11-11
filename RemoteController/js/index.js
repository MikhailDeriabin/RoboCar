import { Command } from "./Command.js";
import { SensorValue } from "./SensorValue.js";
const client = mqtt.connect('ws://192.168.50.91:8883');

const robotTopic = "1/0";
const usSensorTopic = "1/1";

const forwardButton = document.querySelector("#forwardButton");
const leftButton = document.querySelector("#leftButton");
const backButton = document.querySelector("#backButton");
const rightButton = document.querySelector("#rightButton");
const turnLeftButton = document.querySelector("#turnLeftButton");
const turnRightButton = document.querySelector("#turnRightButton");
const measureCoordinatesButton = document.querySelector("#measureCoordinatesButton");

const saveToFileButton = document.querySelector("#saveToFileButton");

let coordinatesArray = [];

let moveForwardIntervalId, moveBackIntervalId, turnLeftIntervalId, turnRightIntervalId;

forwardButton.addEventListener("mousedown", (e) => {
    moveForwardIntervalId = setInterval(moveForward, 10);
});

forwardButton.addEventListener("mouseup", (e) => {
    stopMoving(moveForwardIntervalId);
});

leftButton.addEventListener("click", (e) => {
    turnLeft();
});

backButton.addEventListener("mousedown", (e) => {
    moveBackIntervalId = setInterval(moveBack, 10);
});

backButton.addEventListener("mouseup", (e) => {
    stopMoving(moveBackIntervalId);
});

rightButton.addEventListener("click", (e) => {
    turnRight();
});

measureCoordinatesButton.addEventListener("click", (e) => {
    measureCoordinates();
});

turnLeftButton.addEventListener("mousedown", (e) => {
    turnLeftIntervalId = setInterval(turnLeftMS, 10);
});

turnLeftButton.addEventListener("mouseup", (e) => {
    stopMoving(turnLeftIntervalId);
});

turnRightButton.addEventListener("mousedown", (e) => {
    turnRightIntervalId = setInterval(turnRightMS, 10);
});

turnRightButton.addEventListener("mouseup", (e) => {
    stopMoving(turnRightIntervalId);
});

saveToFileButton.addEventListener("click", async (e) => {
    const file = new Blob([JSON.stringify(coordinatesArray)], {type: "application/json"});

    const fileHandle = await window.showSaveFilePicker({
        types: [{
            description: "JSON file",
            accept: {"application/json": [".json"]}
        }]
    });
    const fileStream = await fileHandle.createWritable();

    await fileStream.write(file);
    await fileStream.close();
});

function moveForward() {
    const durationMs = 10;
    sendCommand(robotTopic, Command.MOVE_FORWARD, durationMs);
}

function moveBack() {
    const durationMs = 10;
    sendCommand(robotTopic, Command.MOVE_BACK, durationMs);
}

function turnLeft() {
    sendCommand(robotTopic, Command.TURN_LEFT);
}

function turnRight() {
    sendCommand(robotTopic, Command.TURN_RIGHT);
}

function turnLeftMS() {
    const durationMs = 10;
    sendCommand(robotTopic, Command.TURN_LEFT, durationMs);
}

function turnRightMS() {
    const durationMs = 10;
    sendCommand(robotTopic, Command.TURN_RIGHT, durationMs);
}

function stopMoving(intervalId){
    clearInterval(intervalId);
    sendCommand(robotTopic, Command.STOP_MOVING);
}

function measureCoordinates() {
    client.subscribe(usSensorTopic);
    sendCommand(robotTopic, Command.GET_COORDINATES);
    let msgCount = 0;

    const messages = [];

    client.on("message", function (topic, payload) {
        const msg = payload.toString();
        messages.push(msg);
        msgCount++;
        if(msgCount === 3){
            client.unsubscribe(usSensorTopic);
            const coordinates = generateCoordsArr(messages);
            coordinatesArray.push(coordinates);
        }
    });
}

function sendCommand(topic, command, param) {
    let commandStr = command;
    if(param != null && param !== "")
        commandStr += ":" + param;
    commandStr += ";";

    client.publish(topic, commandStr);
}

function generateCoordsArr(msgArr) {
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

    return result;
}