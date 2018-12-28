services = require("../data/services");

module.exports = {
    getRequiredTime : getRequiredTimeF,
    process : processF
};

function getRequiredTimeF(hs, rs, cs) {
    return +services["Haircut services"][hs]["time"] +
        +services["Razorblade services"][rs]["time"] +
        +services["Color services"][cs]["time"];
}

function processF(db, callback, req, resp) {
    //var timeArray = [getRequiredTimeF(hs, rs, cs)];
    //timeArray.push(0, 10, 11, 25, 50, 70);
    /*
      req.body["hs"],
      req.body["rs"],
      req.body["cs"],
    **/
    let timeArray = getBusyTime(db, callback, req, resp);
}

function getBusyTime(db, callback, req, resp) {
    db.find({"type" : "order"}, (err, docs) => {
        if(!err) {
            let result = [];
            docs.forEach((currentValue, index, array) => {
                console.log(currentValue["startTime"]);
                result.push(currentValue["startTime"]);
                console.log(result);
            });
            callback(req, resp, result);
        }
    });
}

function getFreeTime() {

}

