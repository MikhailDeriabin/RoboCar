import { Command } from "./Command.js";
import { SensorValue } from "./SensorValue.js";
import { CurrentDirection } from "./CurrentDirection.js";
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

const points = [];

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
    const robotTopic = "1/0";
    const usTopic = "1/1";
    const dhtTopic = "1/2";
    const tiltTopic = "1/3";
    const photoTopic = "1/4";

    const topics = [ robotTopic, usTopic, dhtTopic, tiltTopic, photoTopic ];
    for(let i=1; i<topics.length; i++)
        client.subscribe(topics[i] + "/out");

    for(let i=2; i<topics.length; i++)
        sendCommand(topics[i], Command.MEASURE);

    sendCommand(robotTopic, Command.GET_COORDINATES);
    let msgCount = 0;
    let distances = {};
    let currentPoint = {};

    client.on("message", function (topic, payload) {
        const msg = payload.toString();
        msgCount++;

        const valObj = sensorStrToObj(msg);

        if(topic === usTopic+"/out")
            distances = Object.assign(distances, valObj);
        else
            currentPoint = Object.assign(currentPoint, valObj);


        if(msgCount === 6){
            for(let i=1; i<topics.length; i++)
                client.unsubscribe(topics[i] + "/out");

            const xYObj = convertToXYForm(parseInt(distances["DISTANCE_FRONT"]), parseInt(distances["DISTANCE_LEFT"]), parseInt(distances["DISTANCE_RIGHT"]), 300, 600, CurrentDirection.FORWARD);
            currentPoint = Object.assign(currentPoint, xYObj);

            points.push(currentPoint);
            currentPoint = {};
            console.log(points);
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

function convertToXYForm(frontDistance, leftDistance, rightDistance, width, height, currentDirection){
    const coords = {};
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

function sensorStrToObj(str){
    const obj = {};
    let currentKey = '';
    for(let i=0; i<str.length; i++){
        if(str[i] === ':'){
            i++;
            let currentValue = '';
            for(;i<str.length; i++){
                if(str[i] === ',' || i === str.length-1){
                    currentKey = parseInt(currentKey);
                    currentKey = convertIntToStrSensorEnum(currentKey);
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

function convertIntToStrSensorEnum(intVal) {
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