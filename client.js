const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client
const config = require("./config/config.json")

client.commands = new Discord.Collection()

const prefix = config.prefix

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const guildId = "736864547889217637"

client.on('ready', () => {
    console.log("Spamherst is online!")
    client.channels.cache.get(config.channelIds.botLogs).send("Spamherst is Online!")
})

client.on('message', message => {
    if (message.author.bot) return
    if (message.content.startsWith('!')) {
        processCommand(message)
    }
})

client.on('guildMemberAdd', member => {
    // welcome message | channel_name : welcome=chat
    greet(member)

    // add role UMass 
    const guild = client.guilds.cache.get(guildId)
    if (!guild) return console.error("404: guild with ID", guildId, "not found")

    const role = guild.roles.cache.get(config.rolesIds.umass)
    if (!role) return console.error("404: role not found")

    member.roles.add(role)

})

function processCommand(message) {
    const guild = client.guilds.cache.get(guildId)

    const wholeCommand = message.content.substr(1)
    const splitCommand = wholeCommand.split(/ +/) // Split the message up in to pieces for each space
    const commandName = splitCommand.shift().toLowerCase() // The first word directly after the exclamation is the command
    const arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)
    if (command.args && !arguments.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

    /*if (primaryCommand == "createbadge") {
        // !createBadge badgename badgecolor
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
            }).then(console.log(arguments[0] + " role successfully created for user: " + message.author))
                .catch(console.error(arguments[0] + " role can't be created for: " + message.author))
            message.react('👍')
        }
        else {
            message.channel.send("You do not have the permission to create a role").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
        }
    }*/
    if (primaryCommand == "addbadge") {
        // addBadge badgeName || used by users themselves
        if (arguments.length < 0) return
        if (arguments.length > 2) {
            message.channel.send("Please enter the command correctly. Check #general-info for help").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
            return
        }
        if (arguments.length == 1) {
            message.guild.members.fetch(message.author)
                .then(member => {
                    if (member.roles.cache.some(role => role.name === arguments[0])) {
                        message.channel.send("You already have the " + arguments[0] + " badge :(").then(msg => msg.delete({ timeout: 10000 }))
                        message.react('👎')
                    } else {
                        const role = guild.roles.cache.find(role => role.name === arguments[0])
                        if (!role) {
                            message.channel.send("Role not found").then(msg => msg.delete({ timeout: 10000 }))
                            message.react('👎')
                        } else {
                            if (badgesAllowedToAddByUsers(arguments[0])) {
                                member.roles.add(role)
                                message.react('👍')
                            }
                            else {
                                message.channel.send("You don't have the access to the " + arguments[0] + " badge").then(msg => msg.delete({ timeout: 10000 }))
                                message.react('👎')
                            }
                        }
                    }
                })
        }
        if (arguments.length == 2) {
            // addBadge badgeName @person || used by mods
            const user = message.mentions.users.first()
            const member = message.guild.member(user)
            if (message.member.hasPermission('MANAGE_GUILD')) {
                if (member.roles.cache.some(role => role.name === arguments[0])) {
                    message.channel.send("You already have the  " + arguments[0] + "  badge :(").then(msg => msg.delete({ timeout: 10000 }))
                    message.react('👎')
                } else {
                    const role = guild.roles.cache.find(role => role.name === arguments[0])
                    if (!role) {
                        message.channel.send("Role not found").then(msg => msg.delete({ timeout: 10000 }))
                        message.react('👎')
                    } member.roles.add(role)
                    message.react('👍')
                }
            }
            else {
                message.channel.send("You do not have the permission to add a role").then(msg => msg.delete({ timeout: 10000 }))
                message.react('👎')
            }
        }
    }
    if (primaryCommand == "addbadgesforall") {
        // addBadgesForAll badgeName
        if (arguments.length < 0) return
        if (arguments.length > 1) {
            message.channel.send("Please enter the command correctly. Check #general-info for help").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
            return
        }
        if (message.member.hasPermission('MANAGE_GUILD')) {
            const role = guild.roles.cache.find(role => role.name === arguments[0])
            if (!role) {
                message.channel.send("Role not found").then(msg => msg.delete({ timeout: 10000 }))
                message.react('👎')
            }
            guild.members.fetch().then(members => {
                members.forEach(m => {
                    m.roles.add(role)
                })

            })
            message.react('👍')
        }
        else {
            message.channel.send("You do not have the permission to create a role").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
        }
    }

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

function badgesAllowedToAddByUsers(badgeName) {
    const badgesAllowed = [
        'Employed'
    ]
    return badgesAllowed.includes(badgeName)
}


client.login(config.discord_bot.token)
