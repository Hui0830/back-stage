const { imagesSchema } = require('../schema/imagesSchema'),
    mongoose = require('mongoose');


module.exports = mongoose.model('images', imagesSchema);