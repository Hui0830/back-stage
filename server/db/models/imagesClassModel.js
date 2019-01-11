const { imgClassSchema } = require('../schema/imagesSchema'),
    mongoose = require('mongoose');


module.exports = mongoose.model('imgClass', imgClassSchema);