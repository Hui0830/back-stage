const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    roleId: Number,
    roleName: String,
})
roleSchema.index({roleId: 1})

module.exports = mongoose.model('roles', roleSchema);