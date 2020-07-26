const Discord = require('discord.js');
const client = new Discord.Client;
const config = require("./config/config.json")

const guildID = "736864547889217637"


client.on('ready', () => {
    console.log("Spamherst is online!")
    client.channels.cache.get('736913317020434522').send("Spamherst is Online!")
})

client.on('message', message => {
    if (message.author == client.user) {
        return // Prevent bot from responding to its own messages
    }

    if (message.content.startsWith('!')) {
        processCommand(message)
    }

    if (msg.content == 'addroles') {
        const guild = client.guilds.cache.get(guildID);
        const role = guild.roles.cache.get('736909983773491242')
        if (!role) return console.error("404: role not found")
        guild.members.fetch().then(members => {
            members.forEach(m => {
                m.roles.add(role)
            })

        });
    }
})

client.on('guildMemberAdd', member => {
    // welcome message | channel_name : welcome=chat
    client.channels.cache.get('736909338425294899').send("Welcome " + "<@" + member.id + ">" + ", We hope you brought :pizza:")

    // add role UMass 
    const guild = client.guilds.cache.get(guildID);
    if (!guild) return console.error("404: guild with ID", guildID, "not found");

    const role = guild.roles.cache.get('736909983773491242');
    if (!role) return console.error("404: role not found")

    member.roles.add(role)

})

function processCommand(message) {
    let command = message.content.substr(1)

    switch (command) {
        case "ping":
            message.channel.send("pong")
    }

}


client.login(config.DISCORD_BOT.TOKEN)
