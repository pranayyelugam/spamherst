const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'hackernews',
    args: true,
    cooldown: 20,
    usage: 'random or <search query>',
    description: 'HackerNews!',
    async execute(message, args) {

        if (args.length < 0) return
        if (args.length > 2) {
            message.channel.send("Please enter the command correctly. Check #general-info for help")
            return
        }
        if (args[0] == "random") {
            const TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
            const URL = "https://hacker-news.firebaseio.com/v0/item/"

            const list = await fetch(TOP_STORIES).then(response => response.json())
            if (!list.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`)
            }
            const storiesLength = list.length

            const randomValue = Math.floor(Math.random() * (storiesLength))

            const story = await fetch(URL + list[randomValue] + ".json?print=pretty").then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setColor('#EFFF00')
                .setTitle(story.title)
                .setURL(story.url)
                .addFields(
                    { name: 'Author', value: story.by },
                    { name: 'Points', value: story.score }
                )
            message.channel.send(embed);
        }
        else {
            const searchUrl = "https://hn.algolia.com/api/v1/search?query=" + args[0] + "&tags=story&hitsPerPage=3"
            console.log(searchUrl)
            const list = await fetch(searchUrl).then(response => response.json())
            console.log(list.length)
            if (!list.hits.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`)
            }
            list.hits.forEach(story => {
                const embed = new Discord.MessageEmbed()
                    .setColor('#EFFF00')
                    .setTitle(story.title)
                    .setURL(story.url)
                    .addFields(
                        { name: 'Author', value: story.author },
                        { name: 'Points', value: story.points },
                        { name: 'Created at', value: story.created_at }
                    )
                message.channel.send(embed);
            })
        }
    }
}