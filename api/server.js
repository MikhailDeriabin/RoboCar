require("dotenv").config({path: './.env'});

const express = require('express');

const app = express();

app.use(express.json());

app.use("/map", require("./route/map"));
app.use("/point", require("./route/point"));

app.listen(process.env.SERVER_PORT, () => {
    displayLinks();
});

function displayLinks(){
    console.log();
    console.log("----------------------");
    console.log(`HOME: http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
    console.log("----------------------");
    console.log();
}