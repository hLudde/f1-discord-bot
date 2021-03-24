const { MessageEmbed } = require("discord.js");
const utils = require("../utils")

module.exports = {
    command(client, msg, args) {
        var schudule;
        var nextRace;
        var date = new Date(Date.now());
        utils.callAPI(`https://ergast.com/api/f1/${date.getFullYear()}.json`)
            .then(json => {
                schudule = json;
                return utils.callAPI(`https://ergast.com/api/f1/${date.getFullYear()}/next.json`)
            })
            .then(json => {
                nextRace = json;
                const embed = new MessageEmbed();
                embed.setTitle(`F1 ${date.getFullYear()} Schedule`)
                embed.setDescription(`An overview of the races in the ${date.getFullYear()} season. \n Race written in underscore is the next race in the season.`)
                embed.setColor("0xFF0000")
                embed.setThumbnail("https://cdn.discordapp.com/avatars/824294847149768745/69e7c7b6bba8989b0a76ef4ba364dff3.webp")
                schudule.MRData.RaceTable.Races.forEach(race => {
                    var raceDate = new Date(Date.parse(race.date + " " + race.time))
                    var round = `${race.round} - ${race.raceName}`
                    if (nextRace.MRData.RaceTable.Races[0].round == race.round) {
                        round = `__**${race.round} - ${race.raceName}**__`
                    }
                    embed.addField(round, race.Circuit.Location.country + "\n" + raceDate.toUTCString().slice(5, raceDate.toTimeString().length) + "\n" + utils.cutString(raceDate.toTimeString(), 9, 18) + " ", false)
                });
                msg.channel.send(embed);
            })
    }
}