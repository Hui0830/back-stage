const imgClassSchema = require('../schema/classSchema'),
    mongoose = require('mongoose');


module.exports = mongoose.model('imgClass', imgClassSchema);