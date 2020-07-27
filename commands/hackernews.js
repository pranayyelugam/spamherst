const { guildId, MessageEmbed } = require('../config/config.json')
const fetch = require('node-fetch')

module.exports = {
    name: 'hackernews',
    args: true,
    cooldown: 20,
    usage: 'random or <search query>',
    description: 'HackerNews!',
    execute(message, args) {

        const TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        const URL = "https://hacker-news.firebaseio.com/v0/item/"

        if (args.length < 0) return
        if (args.length > 2) {
            message.channel.send("Please enter the command correctly. Check #general-info for help")
            return
        }
        if (args[0] == "random") {
            const { list } = await fetch(TOP_STORIES).then(response => response.json())
            const storiesLength = list.length
            /*
            const randomValue = Math.floor(Math.random() * (storiesLength - 1))

            const story = await fetch(URL + list[randomValue] + ".json?print=pretty")

            const embed = new MessageEmbed()
                .setColor('#EFFF00')
                .setTitle(story.title)
                .setURL(story.URL)
                .addFields(
                    { name: 'Definition', value: story.author }
                )
                */
            message.channel.send(storiesLength);
        }
    }
}