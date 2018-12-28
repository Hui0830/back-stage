const fs = require('fs')
const path = require('path');

const readFile = function(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.join(__dirname,"../../dist/"+fileName), 'utf-8',function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
};
module.exports = readFile;