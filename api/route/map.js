const express = require("express");
const mapController = require("../controller/map");
const reqResHandler = require('../util/reqResHandler');

const router = express.Router();

router.post("/", mapController.createMap, reqResHandler.handlePostResp);
router.get("/:mapId", mapController.getMap, reqResHandler.handleGetResp);
router.get("/", mapController.getAllMaps, reqResHandler.handleGetResp);
router.delete("/:mapId", mapController.deleteMap, reqResHandler.handleDeleteResp);

module.exports = router;