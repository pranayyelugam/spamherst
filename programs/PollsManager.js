const config = require("./config/config.json")
const client = require('./client.js')


async function PollsManager(pMessage) {
    await pMessage.react("🇦");
    await pMessage.react("🅱️");
}

module.exports = { PollsManager }