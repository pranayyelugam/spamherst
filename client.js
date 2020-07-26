const Discord = require('discord.js');
const client = new Discord.Client;
const config = require("./config/config.json")


client.on('ready', () => {
    console.log("Spamherst is online!")
    client.channels.cache.get(config.channelIds.botLogs).send("Spamherst is Online!")
})

client.on('message', message => {
    if (message.author.bot) {
        return // Prevent bot from responding to its own messages
    }

    if (message.content.startsWith('!')) {
        processCommand(message)
    }

    // add roles to all the members in the server at once.
    if (message.member.hasPermission('MANAGE_GUILD')) {
        if (message.content == 'addroles') {
            const guild = client.guilds.cache.get(config.guildId);
            const role = guild.roles.cache.get(config.rolesIds.umass)
            if (!role) return console.error("404: role not found")
            guild.members.fetch().then(members => {
                members.forEach(m => {
                    m.roles.add(role)
                })

            });
        }
    }
})

client.on('guildMemberAdd', member => {
    // welcome message | channel_name : welcome=chat
    greet(member)

    // add role UMass 
    const guild = client.guilds.cache.get(guildId);
    if (!guild) return console.error("404: guild with ID", guildId, "not found");

    const role = guild.roles.cache.get(config.rolesIds.umass);
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

function greet(member) {
    let greetings = [
        "<@" + member.id + ">" + " just showed up, make some space for them!",
        "<@" + member.id + ">" + " just joined the party! Make some noise everyone",
        "Welcome <@" + member.id + ">" + ", We hope you brought :pizza:"
    ]
    let value = Math.floor(Math.random() * 3)
    client.channels.cache.get(config.channelIds.welcomeChat).send(greetings[value])
}


client.login(config.discord_bot.token)
