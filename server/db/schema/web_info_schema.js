const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkSchema = new Schema({
    url: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    }
})

const webInfoSchema = new Schema({
    title: {
        type: String,
        default: '星婴美集团'
    },
    keywords: {
        type: String,
        default: '外贸、定制、童装、家居、批发'
    },
    favicon: {
        type: String,
        default: ''
    },
    logo: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: '外贸公司'
    },
    author: {
        type: String,
        default: '李文辉，1285227393@qq.com'
    },
    address: {
        type: String,
        default: '8005, Jimao Bldg., No. 111, Shaping North Road, Danzhutou, Nanwan Subdistrict, Longgang District'
    },
    tel: {
        type: String,
        default: '13828743305'
    },
    name: {
        type: String,
        default: 'Ada'
    },
    copyright: {
        type: String,
        default: '深圳市星婴美信息科技有限公司 ©2019 Created by 2019-2-14'
    },
    links: [linkSchema]
})

module.exports = webInfoSchema
