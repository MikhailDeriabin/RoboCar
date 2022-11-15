import { Command } from "./Command.js";
import { SensorValue } from "./SensorValue.js";
import { CurrentDirection } from "./CurrentDirection.js";
const client = mqtt.connect('ws://192.168.50.91:8883');

const robotTopic = "1/0";
const usTopic = "1/1";

const forwardButton = document.querySelector("#forwardButton");
const leftButton = document.querySelector("#leftButton");
const backButton = document.querySelector("#backButton");
const rightButton = document.querySelector("#rightButton");
const turnLeftButton = document.querySelector("#turnLeftButton");
const turnRightButton = document.querySelector("#turnRightButton");
const measureCoordinatesButton = document.querySelector("#measureCoordinatesButton");
const startStopMeasurementButton = document.querySelector("#startStopMeasurementButton");

let currentDirection = CurrentDirection.FORWARD;
let isMeasurementStarted = false;
let width, height;

let points = [];

let turnLeftIntervalId, turnRightIntervalId;

forwardButton.addEventListener("mousedown", (e) => {
    switch (currentDirection) {
        case CurrentDirection.FORWARD:
            break;
        case CurrentDirection.LEFT:
            turnRight();
            break;
        case CurrentDirection.RIGHT:
            turnLeft();
            break;
        case CurrentDirection.BACK:
            turnLeft();
            turnLeft();
            break;
    }

    currentDirection = CurrentDirection.FORWARD;
    moveForward();
});

forwardButton.addEventListener("mouseup", (e) => {
    stopMoving();
});

leftButton.addEventListener("mousedown", (e) => {
    switch (currentDirection) {
        case CurrentDirection.FORWARD:
            turnLeft();
            break;
        case CurrentDirection.LEFT:
            break;
        case CurrentDirection.RIGHT:
            turnRight();
            turnRight();
            break;
        case CurrentDirection.BACK:
            turnRight();
            break;
    }

    currentDirection = CurrentDirection.LEFT;
    moveForward();
});

leftButton.addEventListener("mouseup", (e) => {
    stopMoving();
});

backButton.addEventListener("mousedown", (e) => {
    switch (currentDirection) {
        case CurrentDirection.FORWARD:
            turnLeft();
            turnLeft();
            break;
        case CurrentDirection.LEFT:
            turnLeft();
            break;
        case CurrentDirection.RIGHT:
            turnRight();
            break;
        case CurrentDirection.BACK:
            break;
    }

    currentDirection = CurrentDirection.BACK;
    moveForward();
});

backButton.addEventListener("mouseup", (e) => {
    stopMoving();
});

rightButton.addEventListener("mousedown", (e) => {
    switch (currentDirection) {
        case CurrentDirection.FORWARD:
            turnRight();
            break;
        case CurrentDirection.LEFT:
            turnRight();
            turnRight();
            break;
        case CurrentDirection.RIGHT:
            break;
        case CurrentDirection.BACK:
            turnLeft();
            break;
    }

    currentDirection = CurrentDirection.RIGHT;
    moveForward();
});

rightButton.addEventListener("mouseup", (e) => {
    stopMoving();
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

startStopMeasurementButton.addEventListener("click", ()=>{
    if(!isMeasurementStarted){
        startStopMeasurementButton.textContent = "STOP";
        isMeasurementStarted = true;

        client.subscribe(usTopic + "/out");
        sendCommand(robotTopic, Command.GET_COORDINATES);

        let distances = {};
        let msgCount = 0;

        client.on("message", function (topic, payload) {
            const msg = payload.toString();
            msgCount++;
            const valObj = sensorStrToObj(msg);
            distances = Object.assign(distances, valObj);

            if(msgCount === 3){
                client.unsubscribe(usTopic + "/out");
                width = parseInt(distances["DISTANCE_LEFT"]) + parseInt(distances["DISTANCE_RIGHT"]);
                height = parseInt(distances["DISTANCE_FRONT"]);
            }
        });

        currentDirection = CurrentDirection.FORWARD;
    } else {
        startStopMeasurementButton.textContent = "START";
        isMeasurementStarted = false;

        console.log(points);
        points = [];
    }
});

function moveForward() {
    sendCommand(robotTopic, Command.MOVE_FORWARD);
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

            const xYObj = convertToXYForm(parseInt(distances["DISTANCE_FRONT"]), parseInt(distances["DISTANCE_LEFT"]), parseInt(distances["DISTANCE_RIGHT"]));
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

function convertToXYForm(frontDistance, leftDistance, rightDistance){
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
