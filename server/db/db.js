const mongoose = require('mongoose');
import { mongoConnectStr } from '../config/.auth-const';
const userModel = require('./models/userModel');


mongoose.connect(mongoConnectStr,{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('连接成功');
})

db.on('error', (err) => {    
    console.log('连接失败: ' + err);
});

module.exports = db;