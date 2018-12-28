require('babel-register') ({
    presets: [ 'env' ],
    "plugins": [[
        "transform-runtime",
        {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
        }
    ]]
})

module.exports = require('./app.js')