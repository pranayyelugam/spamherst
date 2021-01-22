const { guilds } = require('../client');
const channelschema = require('../database/Schemas/ChannelSchema');
const rolesSchema = require('../database/Schemas/RolesSchema');
const { guildId, channelIds, rolesIds } = require('../config/config.json')
const { findRoleIdByName } = require('../helpers.js')

module.exports = {
    name: 'createchannels',
    args: true,
    cooldown: 5,
    usage: '<channels> <parent category> <role needed to view the channel>',
    description: 'CreateChannelsAndHide',
    async execute(message, args) {
        const guild = message.client.guilds.cache.get(guildId)
        if (args.length < 0) return
        if (args.length > 3) {
            message.channel.send("Please enter the command correctly. Check #general-info for help").then(msg => msg.delete({ timeout: 10000 }))
            message.react('👎')
            return
        }
        if (message.member.hasPermission('MANAGE_GUILD')) {
            const channelsToAdd = args[0].split('|')
            const rolesForChannels = args[2].split('|')
            const parentChannel = message.client.channels.resolve(channelIds[args[1]]);
            channelsToAdd.map((channelItem, i) => {
                //const roleId = findRoleIdByName(rolesForChannels[i])
                const roleId = rolesSchema.find({
                    roleName: rolesForChannels[i]
                }).then(result => {
                    const [{ roleId, roleName }] = result


                    guild.channels.create(channelItem, {
                        type: 'text',
                        parent: parentChannel,
                        permissionOverwrites: [
                            {
                                id: message.author.id,
                                allow: ['VIEW_CHANNEL'],

                            },
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                            {
                                id: roleId,
                                allow: ['VIEW_CHANNEL']
                            }
                        ],
                    }).then(channel => {
                        channelschema.create({
                            channelId: channel.id,
                            channelName: channelItem
                        })
                    }
                    ).then(console.log(channelItem + " channel has successfully created and visible only to people having role" + rolesForChannels[i]))
                        .catch(function (e) {
                            console.error(e); // "oh, no!"
                        })
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