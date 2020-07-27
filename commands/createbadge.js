const { guildId } = require('../config/config.json')

module.exports = {
    name: 'createbadge',
    args: true,
    cooldown: 5,
    usage: '<role>',
    description: 'CreateBadge!',
    execute(message, args) {
        const guild = message.client.guilds.cache.get(guildId)

        if (message.member.hasPermission('MANAGE_GUILD')) {
            if (args.length < 0) return
            if (args.length > 2) {
                message.channel.send("Please enter the command correctly. Check #general-info for help")
                return
            }
            guild.roles.create({
                data: {
                    name: args[0],
                    color: args[1]
                }
            }).then(console.log(args[0] + " role successfully created for user: " + message.author))
                .catch(console.error(args[0] + " role can't be created for: " + message.author))
            message.react('👍')
        }
        else {
            message.channel.send("You do not have the permission to create a role").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
        }
    }
};