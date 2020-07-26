const Discord = require('discord.js');
const client = new Discord.Client;
const config = require("./config/config.json")

const guildId = "736864547889217637"

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
    const guild = client.guilds.cache.get(guildId)

    let command = message.content.substr(1)
    let splitCommand = command.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    switch (primaryCommand) {
        case "createBadge":
            // !createrole Employed BLUE
            if (message.member.hasPermission('MANAGE_GUILD')) {
                if (arguments.length < 0) return
                if (arguments.length > 2) {
                    message.channel.send("Please enter the command correctly. Check #general-info for help")
                    return
                }
                guild.roles.create({
                    data: {
                        name: arguments[0],
                        color: arguments[1]
                    }
                }).then(console.log("Employed role successfully created for user: " + message.author))
                    .catch(console.error("Employed role can't be created for: " + message.author))
                message.react('👍')
            }
            else {
                message.channel.send("You do not have the permission to create a role").then(sentMessage => {
                    sentMessage.react('👎');
                });
            }
        case "addBadge":
            if (arguments.length < 0) return
            if (arguments.length > 1) {
                message.channel.send("Please enter the command correctly. Check #general-info for help")
                return
            }
            if (arguments[0] == "Employed") {
                message.guild.members.fetch(message.author)
                    .then(member => {
                        if (member.roles.cache.some(role => role.name === 'Employed')) {
                            message.channel.send("You already have the Employed badge :(").then(sentMessage => {
                                sentMessage.react('👎');
                            });
                        } else {
                            const role = guild.roles.cache.find(role => role.name === 'Employed')
                            if (!role) return console.error("404: role not found")
                            member.roles.add(role)
                            message.react('👍')
                        }
                    })
            }
        case "addBadgesForAll":
            if (arguments.length < 0) return
            if (arguments.length > 1) {
                message.channel.send("Please enter the command correctly. Check #general-info for help")
                return
            }
            if (message.member.hasPermission('MANAGE_GUILD')) {
                const role = guild.roles.cache.find(role => role.name === arguments[0])
                if (!role) return console.error("404: role not found")
                guild.members.fetch().then(members => {
                    members.forEach(m => {
                        m.roles.add(role)
                    })

                })
                message.react('👍')
            }
            else {
                message.channel.send("You do not have the permission to create a role").then(sentMessage => {
                    sentMessage.react('👎');
                });
            }

    }


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
