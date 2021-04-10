const { MessageEmbed } = require('discord.js');
const utils = require('../../modules/utils');

module.exports = {
	name: 'nextrace',
	aliases: ['nr', 'nrace', 'nextr'],
	description: 'Shows information about the next race',
	args: false,
	usage: '',
	guildOnly: false,
	cooldown: 60,
	execute(message) {
		let response;
		let race;
		const date = new Date(Date.now());
		utils.callAPI(`https://ergast.com/api/f1/${date.getFullYear()}/next.json`)
			.then(json => {
				response = json;
				race = response.MRData.RaceTable.Races[0];
			})
			.then(()=>{
				const embed = new MessageEmbed();
				const raceDate = new Date(Date.parse(race.date + ' ' + race.time));
				embed.setColor('0xFF0000');
				embed.setThumbnail('https://cdn.discordapp.com/avatars/824294847149768745/69e7c7b6bba8989b0a76ef4ba364dff3.webp');
				embed.setTitle(`${race.raceName}`);
				embed.setDescription(`An overview of the next race in the ${date.getFullYear()} season.`);
				embed.addField('Information', `**Name**:\n${race.raceName}\n**Circuit:**\n${race.Circuit.circuitName}\n**Country:**\n${race.Circuit.Location.country}\n**City**\n${race.Circuit.Location.locality}\n**Round:**\n${race.round}\n**Race Start:**\n${raceDate.toUTCString().slice(5, raceDate.toTimeString().length)}\n**Race Start Alternative:**\n${ raceDate.toUTCString().slice(5, 17) + utils.cutString(raceDate.toTimeString(), 9, 18)}`);
				message.channel.send(embed);
			});
	},
};