const { guildId } = require('../config/config.json')
const badgesAllowedToAddByUsers = require('../config/config.json')

module.exports = {
    name: 'addbadge',
    args: true,
    cooldown: 5,
    usage: '<role>',
    description: 'AddBadge!',
    execute(message, args) {
        const guild = message.client.guilds.cache.get(guildId)

        // addBadge badgeName || used by users themselves
        if (args.length < 0) return
        if (args.length > 2) {
            message.channel.send("Please enter the command correctly. Check #general-info for help").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
            return
        }
        if (args.length == 1) {
            message.guild.members.fetch(message.author)
                .then(member => {
                    if (member.roles.cache.some(role => role.name === args[0])) {
                        message.channel.send("You already have the " + args[0] + " badge :(").then(msg => msg.delete({ timeout: 10000 }))
                        message.react('👎')
                    } else {
                        const role = guild.roles.cache.find(role => role.name === args[0])
                        if (!role) {
                            message.channel.send("Role not found").then(msg => msg.delete({ timeout: 10000 }))
                            message.react('👎')
                        } else {
                            if (badgesAllowedToAddByUsers(args[0])) {
                                member.roles.add(role)
                                message.react('👍')
                            }
                            else {
                                message.channel.send("You don't have the access to the " + args[0] + " badge").then(msg => msg.delete({ timeout: 10000 }))
                                message.react('👎')
                            }
                        }
                    }
                })
        }
        if (args.length == 2) {
            // addBadge badgeName @person || used by mods
            const user = message.mentions.users.first()
            const member = message.guild.member(user)
            if (message.member.hasPermission('MANAGE_GUILD')) {
                if (member.roles.cache.some(role => role.name === args[0])) {
                    message.channel.send("You already have the  " + args[0] + "  badge :(").then(msg => msg.delete({ timeout: 10000 }))
                    message.react('👎')
                } else {
                    const role = guild.roles.cache.find(role => role.name === args[0])
                    if (!role) {
                        message.channel.send("Role not found").then(msg => msg.delete({ timeout: 10000 }))
                        message.react('👎')
                    }
                    else {
                        member.roles.add(role)
                        message.react('👍')
                    }
                }
            }
            else {
                message.channel.send("You do not have the permission to add a role").then(msg => msg.delete({ timeout: 10000 }))
                message.react('👎')
            }
        }
        function badgesAllowedToAddByUsers(badgeName) {
            const badgesAllowed = [
                'Employed',
                'Online',
                'Spring'
            ]
            return badgesAllowed.includes(badgeName)
        }
    }
}