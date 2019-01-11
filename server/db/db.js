const mongoose = require('mongoose');
import { mongoConnectStr } from '../config/.auth-const';
const {articleTest, imagesClass} = require('../create_test_data');


mongoose.connect(mongoConnectStr,{ useNewUrlParser: true });

const db = mongoose.connection;

db.on('connected', () => {
    console.log('连接成功');
    // createArticle();
    // articleTest.create()
    // imagesClass.createClass();
})

db.on('error', (err) => {    
    console.log('连接失败: ' + err);
});

module.exports = db;