const mongoose = require('mongoose');

const channelsSchema = mongoose.Schema({
    channelName: String,
    channelId: String
})

module.exports = mongoose.model('Channels', channelsSchema);