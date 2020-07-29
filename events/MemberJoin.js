const config = require("./config/config.json")
const client = require('./client.js')

function memberJoin(member) {
    // welcome message | channel_name : welcome=chat
    greet(member)

    // add role UMass 
    const guild = client.guilds.cache.get(guildId)
    if (!guild) return console.error("404: guild with ID", guildId, "not found")

    const role = guild.roles.cache.get(config.rolesIds.umass)
    if (!role) return console.error("404: role not found")

    member.roles.add(role)
}

function greet(member) {
    const greetings = [
        "<@" + member.id + ">" + " just showed up, make some space for them!",
        "<@" + member.id + ">" + " just joined the party! Make some noise everyone",
        "Welcome <@" + member.id + ">" + ", We hope you brought :pizza:"
    ]
    const value = Math.floor(Math.random() * 3)
    client.channels.cache.get(config.channelIds.welcomeChat).send(greetings[value])
}

module.exports = { memberJoin }