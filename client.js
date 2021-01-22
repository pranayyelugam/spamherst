const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
const prodConfig = require("./config/config.json")
const devConfig = require("./config/config.json")
const mongo = require("./database/dbConnect.js");
const { addReaction } = require("./events/MessageReactAdd.js")
const { removeReaction } = require("./events/MessageReactRemove.js")
const { routeMessage } = require("./programs/MessageManager.js")
const { memberJoin } = require("./events/MemberJoin.js")

let config = devConfig


client.on('ready', async () => {
    console.log("Spamherst is online!")
    await mongo().then(() => console.log(("Connected to database.")));
    client.channels.cache.get(config.channelIds.botLogs).send("Spamherst is Online!")
})

client.on('message', message => { routeMessage(message) })

client.on('guildMemberAdd', member => { memberJoin(member) })

client.on("guildMemberUpdate", function (oldMember, newMember) {
    //console.error(`a guild member changes - i.e. new role, removed role, nickname.`)
})

client.on("messageReactionAdd", function (messageReaction, user) {
    addReaction(messageReaction, user)
})

client.on("messageReactionRemove", function (messageReaction, user) {
    removeReaction(messageReaction, user)
});

client.login(process.env.token)

module.exports = client
