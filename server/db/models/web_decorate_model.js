const mongoose = require('mongoose'),
    webDecorate = require('../schema/web_decorate_schema');



module.exports = mongoose.model('webDecorate', webDecorate);