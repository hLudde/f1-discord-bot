require('dotenv').config();
const { Client, MessageEmbed } = require('discord.js');
const help = require('./commands/help');
const schdule = require('./commands/schdule');
const utils = require('./utils');

const client = new Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(process.env.CHAT_PREFIX);
});

client.on('message', msg => {
    if (msg.channel.id != process.env.DISCORD_CHANNEL) {
        return;
    }
    if (msg.author.bot) {
        return;
    }
    args = msg.content.toLowerCase().split(" ");
    if (args[0] != process.env.CHAT_PREFIX) {
        return;
    }
    if (args[1] == "help") {
        help.command(client, msg, args);
    }
    if (args[1] == "schedule" || args[1] == "sch") {
        schdule.command(client, msg, args);
        return;
    }
});

client.login(process.env.DISCORD_TOKEN);