const Discord = require('discord.js');
const client = new Discord.Client;
const config = require("./config/config.json")


client.on('ready', () => {
    console.log("Spamherst is online!")
    client.channels.cache.get('736913317020434522').send("Spamherst is Online!")
})

client.on('message', msg => {
    if (msg.content == 'ping') {
        console.log('pong')
    }
})

client.on('guildMemberAdd', member => {
    // welcome message
    client.channels.cache.get('736909338425294899').send("Welcome" + "<@" + member.id + ">" + ", We hope you brought :pizza:")

    // add role newmember UMass 
    const role = guild.roles.cache.find(role => role.name === "736909983773491242");
    member.roles.add(role)
})




client.login(config.DISCORD_BOT.TOKEN)
