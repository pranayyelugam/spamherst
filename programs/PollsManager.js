async function PollsManager(pMessage) {
    await pMessage.react("🇦");
    await pMessage.react("🅱️");
}

module.exports = { PollsManager }