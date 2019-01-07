// 添加node端导入配置适配ES6模块语法
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