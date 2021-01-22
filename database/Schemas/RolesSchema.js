const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
    roleName: String,
    roleId: String
})

module.exports = mongoose.model('Roles', rolesSchema);