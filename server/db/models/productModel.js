const mongoose = require('mongoose');
const productSchema = require('../schema/productSchema');
const productClassSchema = require('../schema/classSchema');

const productModel = mongoose.model('product', productSchema);
const productClassModel = mongoose.model('productClass', productClassSchema);

module.exports = {
    productModel,
    productClassModel
}