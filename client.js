const Discord = require('discord.js');
const client = new Discord.Client;
const config = require("./config/config.json")


client.on('ready', () => {
    console.log("Spamherst is online!");
});

client.on('message', msg => {
    if (msg.content == 'ping') {
        console.log('pong')
    }
});

client.on('guildMemberAdd', member => {
    member.guild.channels.get('736909338425294899').send('**' + member.user.username + '**, has joined the server!')
        .then(send("We hope you have brought pizza with you!"))
});


client.login(config.DISCORD_BOT.TOKEN)
