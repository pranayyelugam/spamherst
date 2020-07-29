const { hasRole } = require('../helpers.js')
const { ChannelToggleRepository } = require('..constants.js')

function addReaction(messageReaction, User) {
    const user = User
    const message = messageReaction.message
    const messageId = messageReaction.message.id
    const reaction = messageReaction.emoji.name
    const pureEmoji = messageReaction.emoji.toString()
    const channel = messageReaction.message.channel
    const guild = channel.guild

    console.log(messageReaction);

    console.log(message + " --- " + messageId + " --- " + reaction)



    const guildMember = guild.members.cache.find(
        (m) => m.id == user.id
    )

    const toggle = ChannelToggleRepository.find((c) => (c.messageId === messageId && c.emoji === reaction))
    const communityChannel = guild.channels.cache.find(
        (c) => c.id === toggle.channelId
    )

    if (hasRole(guildMember, "UMass")) {
        communityChannel.updateOverWrite(user.id, {
            VIEW_CHANNEL: true
        })
    }
    else {
        console.log("doesn't have UMass tag. Ask @support to get one")
    }



}

module.exports = { addReaction };