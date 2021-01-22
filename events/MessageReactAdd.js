const { hasRole } = require('../helpers.js')
const { ChannelToggleRepository } = require('../constants.js')
const ChannelSchema = require('../database/Schemas/ChannelSchema.js')

async function addReaction(messageReaction, User) {
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
    console.log(toggle)
    if (toggle === undefined) {
        return;
    }
    const toggleChannel = await ChannelSchema.find({
        channelName: toggle.channelName
    })
    const [{ channelId, channelName }] = toggleChannel

    const communityChannel = guild.channels.cache.find(
        (c) => c.id === channelId
    )

    if (hasRole(guildMember, "UMass")) {
        await communityChannel.updateOverwrite(user.id, {
            VIEW_CHANNEL: true
        })
    }
    else {
        console.log("doesn't have UMass tag. Ask @support to get one")
    }
}

module.exports = { addReaction };