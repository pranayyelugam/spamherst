const { guildId } = require('../config/config.json')

module.exports = {
    name: 'addbadgesforall',
    args: true,
    cooldown: 5,
    usage: '<role>',
    description: 'AddBadgesForAll!',
    execute(message, args) {
        const guild = message.client.guilds.cache.get(guildId)
        if (args.length < 0) return
        if (args.length > 1) {
            message.channel.send("Please enter the command correctly. Check #general-info for help").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
            return
        }
        if (message.member.hasPermission('MANAGE_GUILD')) {
            const role = guild.roles.cache.find(role => role.name === args[0])
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
};