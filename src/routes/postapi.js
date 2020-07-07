// import * as myjson from "./multiply_.json";
const fs = require("fs");

export function post(req, res, next) {
    console.log(req.body);
	fs.writeFile("./multiply_.json", JSON.stringify(req.body), (err) => {
        if (err) {
            console.log("Data not saved");
            console.log(err);
        } else {
            console.log("Data saved");
        }
    });
}
