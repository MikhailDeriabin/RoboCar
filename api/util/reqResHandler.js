/**
 * The function sends default response for the GET request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handleGetResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been found",
            result: res.result
        });
    } else{
        res.json({
            isSuccess: false,
            message: "No data found",
            result: {}
        });
    }

    res.end();
}

/**
 * The function sends default response for the POST request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handlePostResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been added"
        });
    } else{
        const message = res.msg != null ? res.msg : "Problems with adding data";
        res.json({
            isSuccess: false,
            message: message
        });
    }

    res.end();
}

/**
 * The function sends default response for the PUT request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handlePutResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been updated"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "Problems with updating data"
        });
    }

    res.end();
}

/**
 * The function sends default response for the DELETE request
 * @param req {object} request object
 * @param res {object} response object
 */
exports.handleDeleteResp = (req, res) => {
    if(res.isSuccess){
        res.json({
            isSuccess: true,
            message: "Data has been deleted"
        });
    } else{
        res.json({
            isSuccess: false,
            message: "Problems with deleting data"
        });
    }

    res.end();
}