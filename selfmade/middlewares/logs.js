const fs = require("fs");

function LogReqRes(filename){
    return (req,res,next) => {
        fs.appendFile(
            filename,
            `${Date.now()}  : ${req.ip} - ${req.method} - ${req.path}`,
            (err, data) => {
                next();
            }
        )
    }
};

module.exports = {
    LogReqRes,
}