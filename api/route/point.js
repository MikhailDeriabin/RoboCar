const express = require("express");
const pointController = require("../controller/point");
const reqResHandler = require('../util/reqResHandler');

const router = express.Router();
router.get("/:pointId", pointController.getPoint, reqResHandler.handleGetResp);
router.delete("/:pointId", pointController.deletePoint, reqResHandler.handleDeleteResp);

module.exports = router;