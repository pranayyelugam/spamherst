
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

}

module.exports = { addReaction };