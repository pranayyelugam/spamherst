const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
const config = require("./config/config.json")
const { addReaction } = require("./events/MessageReactAdd.js")
const { removeReaction } = require("./events/MessageReactRemove.js")
const { routeMessage } = require("./programs/MessageManager.js")
const { memberJoin } = require("./events/MemberJoin.js")

client.on('ready', () => {
    console.log("Spamherst is online!")
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

client.login(config.discord_bot.token)

module.exports = client
