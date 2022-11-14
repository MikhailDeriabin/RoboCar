const db = require("../util/DB");

exports.getPoint = async (req, res, next) => {
    try{
        const pointId = req.params.pointId;

        const selectPointQ = `SELECT * FROM Point WHERE id=?`;
        let selectPointResp = await db.makeQuery(selectPointQ, pointId);

        if(selectPointResp && selectPointResp.length > 0){
            res.result = selectPointResp[0];
            res.status(200);
            res.isSuccess = true;
        } else{
            console.log("No point with that id");
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

exports.deletePoint = async (req, res, next) => {
    try{
        const pointId = req.params.pointId;
        const deletePointQ = `DELETE FROM Point WHERE id=?`;
        let deletePointResp = await db.makeQuery(deletePointQ, pointId);
        if(deletePointResp){
            res.status(200);
            res.isSuccess = true;
        } else{
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