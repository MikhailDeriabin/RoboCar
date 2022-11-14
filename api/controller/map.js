const db = require("../util/DB");
const util = require("../util/util");

exports.createMap = async (req, res, next) => {
    try {
        const {name, width, height, points} = req.body;
        const mapValues = [name, width, height];
        const haveNoNulls = util.containNoNullArr(mapValues);

        if (haveNoNulls && points && points.length>0) {
            const createMapQ = `INSERT INTO Map (name, width, height) VALUES (?, ?, ?)`;
            const mapCreateResp = await db.makeQuery(createMapQ, mapValues);

            const mapId = mapCreateResp.insertId;
            if(mapCreateResp){
                for(let i=0; i<points.length; i++){
                    const {x, y, temperature, humidity, lightIntensity, isTilted} = points[i];
                    const haveNoNulls = util.containNoNullArr([x, y]);

                    if(haveNoNulls){
                        const createPointQ = `INSERT INTO Point (x, y, temperature, humidity, lightIntensity, isTilted, mapId) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                        await db.makeQuery(createPointQ, [x, y, temperature, humidity, lightIntensity, isTilted, mapId]);
                    }
                }
                res.status(200);
                res.isSuccess = true;
            }
        } else {
            res.status(500);
            res.isSuccess = false;
        }
    } catch (e) {
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}

exports.getAllMaps = async (req, res, next) => {
    try{
        const selectMapsQ = `SELECT * FROM Map`;
        const selectMapsResp = await db.makeQuery(selectMapsQ);

        res.result = selectMapsResp;
        res.status(200);
        res.isSuccess = true;
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}

exports.getMap = async (req, res, next) => {
    try{
        const mapId = req.params.mapId;
        const selectMapQ = `SELECT * FROM Map WHERE id=?`;
        let selectMapResp = await db.makeQuery(selectMapQ, mapId);
        if(selectMapResp && selectMapResp.length > 0){
            const selectPointsQ = `SELECT * FROM Point WHERE mapId=?`;
            const selectPointsResp = await db.makeQuery(selectPointsQ, mapId);

            const result = selectMapResp[0];
            result.points = selectPointsResp;

            res.result = result;
            res.status(200);
            res.isSuccess = true;
        } else{
            console.log("No map with that id");
            res.status(500);
            res.isSuccess = false;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}

exports.deleteMap = async (req, res, next) => {
    try{
        const mapId = req.params.mapId;
        const deletePointsQ = `DELETE FROM Point WHERE mapId=?`;
        const deletePointsResp = await db.makeQuery(deletePointsQ, mapId);
        const deleteMapsQ = `DELETE FROM Map WHERE id=?`;
        let deleteMapResp = await db.makeQuery(deleteMapsQ, mapId);

        if(deleteMapResp && deletePointsResp){
            res.status(200);
            res.isSuccess = true;
        } else{
            console.log("Could not delete the map");
            res.status(500);
            res.isSuccess = false;
        }
    } catch (e){
        console.log("No connection to the DB or problems with query");
        console.log(e);
        res.status(500);
        res.isSuccess = false;
    }

    next();
}