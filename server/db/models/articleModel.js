const mongoose = require('mongoose'),
    articleSchema = require('../schema/articleSchema');



module.exports = mongoose.model('article', articleSchema);