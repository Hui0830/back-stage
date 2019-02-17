const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classesSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    salePrice: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0,
    },
    brand: {
        type: String,
        default: '星婴美'
    },
    ages: {
        type: String,
        default: 'all'
    },
    place: {
        type: String,
        default: '中国大陆'
    },
    material: {
        type: String,
    },
    classes: [classesSchema],
    images: {
        type: Array,
        default: []
    },
    describe: {
        type: String,
        required: true
    },
    buyUrl: {
        type: String,
        required: true
    },
    typeClass: {
        type: Array,
        default: ['all']
    },
    time: {
        type: Date,
        default: Date.now()
    },
    sellTime: {
        type: Date,
        default: null,
    }
})

module.exports = productSchema;