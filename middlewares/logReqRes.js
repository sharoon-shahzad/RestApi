
const fs = require("fs");
function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFile(filename,`${req.method} ${req.url} ${new Date().toString()}\n`,(err)=>
            {
              if(err)
              {
                console.log(err);
              }
            })
            next();
    }
}
module.exports = logReqRes;