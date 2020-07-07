const fs = require("fs");

export function get(res, req, next) {
    fs.readFile("./multiply_.json", (err, data) => {
        if (err) throw err;
        let the_numbers = JSON.parse(data);
        console.log(the_numbers);
    });
}