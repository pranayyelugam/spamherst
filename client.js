const fs = require('fs');
const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'REACTION'] })
const config = require("./config/config.json")
const { reactionAdd } = require("./events/MessageReactAdd.js")

client.commands = new Discord.Collection()

const prefix = config.prefix

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

const cooldowns = new Discord.Collection()
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

client.on("guildMemberUpdate", function (oldMember, newMember) {
    console.error(`a guild member changes - i.e. new role, removed role, nickname.`)
})

client.on("messageReactionAdd", function (messageReaction, user) {
    reactionAdd(messageReaction, user)
})

function processCommand(message) {
    const guild = client.guilds.cache.get(guildId)

    const wholeCommand = message.content.substr(1)
    const splitCommand = wholeCommand.split(/ +/) // Split the message up in to pieces for each space
    const commandName = splitCommand[0].toLowerCase() // The first word directly after the exclamation is the command
    const args = splitCommand.slice(1) // All other words are args/parameters/options for the command

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    if (command.args && !args.length) {
        let reply = `You didn't provide any args, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args)
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
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

client.login(config.discord_bot.token)
