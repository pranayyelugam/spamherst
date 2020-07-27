const { MessageEmbed } = require('../config/config.json')
const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'hackernews',
    args: true,
    cooldown: 20,
    usage: 'random or <search query>',
    description: 'HackerNews!',
    async execute(message, args) {

        const TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        const URL = "https://hacker-news.firebaseio.com/v0/item/"

        if (args.length < 0) return
        if (args.length > 2) {
            message.channel.send("Please enter the command correctly. Check #general-info for help")
            return
        }
        if (args[0] == "random") {
            const list = await fetch(TOP_STORIES).then(response => response.json())
            if (!list.length) {
                return message.channel.send(`No results found for **${args.join(' ')}**.`)
            }
            const storiesLength = list.length

            const randomValue = Math.floor(Math.random() * (storiesLength))

            const story = await fetch(URL + list[randomValue] + ".json?print=pretty").then(response => response.json())
            console.log(story)
            const d = new Date(story.time)
            const pubDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
            const embed = new Discord.MessageEmbed()
                .setColor('#EFFF00')
                .setTitle(story.title)
                .setURL(story.url)
                .addFields(
                    { name: 'Author', value: story.by },
                    { name: 'Added on', value: pubDate },
                    { name: 'Points', value: story.score }
                )
            message.channel.send(embed);
        }
    }
}