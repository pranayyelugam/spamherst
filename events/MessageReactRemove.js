const { hasRole, textLog } = require('../helpers.js')
const { ChannelToggleRepository } = require('../constants.js')

async function removeReaction(messageReaction, User) {
    const user = User
    const message = messageReaction.message
    const messageId = messageReaction.message.id
    const reaction = messageReaction.emoji.name
    const pureEmoji = messageReaction.emoji.toString()
    const channel = messageReaction.message.channel
    const guild = channel.guild

    if (user.bot) return
    const guildMember = guild.members.cache.find(
        (m) => m.id == user.id
    )

    const toggle = ChannelToggleRepository.find((c) => (c.messageId === messageId && c.emoji === reaction))
    if (toggle === undefined) {
        return;
    }
    const communityChannel = guild.channels.cache.find(
        (c) => c.id === toggle.channelId
    )

    if (hasRole(guildMember, "UMass")) {
        if (communityChannel === undefined) {
            textLog(
                `I can't find this channel <#${communityChannel.id}>. Has it been deleted?`
            );
            return;
        }
        await communityChannel.permissionOverwrites.get(user.id).delete()
    }
    else {
        console.log("doesn't have UMass tag. Ask @support to get one")
    }



}

module.exports = { removeReaction };