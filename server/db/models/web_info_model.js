const webInfoSchema = require('../schema/web_info_schema'),
    mongoose = require('mongoose');

module.exports = mongoose.model('webInfo', webInfoSchema)