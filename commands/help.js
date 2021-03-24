const { MessageEmbed } = require("discord.js");
const utils = require("../utils")

module.exports = {
    command(client, msg, args) {
        const embed = new MessageEmbed();
        embed.setTitle("F1 Help")
        embed.setColor("0xFF0000")
        embed.setThumbnail("https://cdn.discordapp.com/avatars/824294847149768745/69e7c7b6bba8989b0a76ef4ba364dff3.webp")
        embed.setDescription(`Overview over commands, all commands starts with the prefix '**${process.env.CHAT_PREFIX}**'`);
        embed.addField("help", "Aliases: none \n Shows this message here");
        embed.addField("schedule", `Aliases: sch \n Shows a schedule over F1 ${new Date(Date.now()).getFullYear()} races`)
        msg.channel.send(embed);
    }
}