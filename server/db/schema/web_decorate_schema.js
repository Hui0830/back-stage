const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 导航
const navSchema = new Schema({
    name: {
        type: String,
        default: 'tab'
    },
    url: {
        type: String,
        default: '/imdex'
    }
})
// 轮播图
const imageSchema = new Schema({
    image: {
        type: String,
        default: 'images/1548125645068-f5a8526c95d07.jpg'
    },
    url: {
        type: String,
        default: '/index'
    }
})
// 基础模型
const baseSchema = new Schema({
    title: {
        type: String,
        default: 'title'
    },
    smallTitle: {
        type: String,
    },
    descript: {
        type: String,
    },
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    bgColor: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#333'
    },
})
// 产品模型
const productSchema = new Schema({
    title: {
        type: String,
        default: ''
    },
    smallTitle: {
        type: String,
        default: ''
    },
    bgColor: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#333'
    },
    images: [imageSchema]
})
// 地址模型
const phoneScheam = new Schema({
    tel: String,
    name: String,
})
const addressSchema = new Schema({
    phone: [phoneScheam],
    email: String,
    address: String,
    bgColor: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#333'
    },
})
// 产品类别
const productNavSchema = new Schema({
    name: String,
    url: String,
    bgColor: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#333'
    },
    image: String,
})
const webSchema = new Schema({
    name: {
        type: String,
        default: '模版'
    },
    type: {
        type: String,
        default: '1'
    },
    nav: [navSchema],
    about: baseSchema,
    purpose: baseSchema,
    introduction: baseSchema,
    staff: baseSchema,
    carousel: [imageSchema],
    product: [productSchema],
    contact: baseSchema,
    address: addressSchema,
    productNav: [productNavSchema]
})


module.exports = webSchema;