const { guildId } = require('../config/config.json')
const rolesSchema = require('../database/Schemas/RolesSchema');


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

            const rolesToCreate = args[0].split('|')
            rolesToCreate.map(roleName => {
                guild.roles.create({
                    data: {
                        name: roleName,
                        color: args[1]
                    }
                })
                    .then(role => {
                        rolesSchema.create({
                            roleId: role.id,
                            roleName: roleName
                        })
                    }
                    ).then(console.log(roleName + " role successfully created"))
                    .catch(function (e) {
                        console.error(e); // "oh, no!"
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