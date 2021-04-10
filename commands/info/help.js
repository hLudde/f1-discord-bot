const { MessageEmbed } = require('discord.js');
const prefix = process.env.CHAT_PREFIX;

module.exports = {
	name: 'help',
	aliases: ['?'],
	description: 'Shows this message here',
	args: false,
	usage : '<command>',
	guildOnly: false,
	cooldown: 3,
	execute(message, args) {
		const { commands } = message.client;
		const embed = new MessageEmbed();
		embed.setTitle('F1 Help');
		embed.setColor('0xFF0000');
		embed.setThumbnail('https://cdn.discordapp.com/avatars/824294847149768745/69e7c7b6bba8989b0a76ef4ba364dff3.webp');
		if (!args.length) {
			embed.setDescription(`Overview over commands, all commands starts with the prefix '**${prefix}**'\n You can send \`${prefix} help [command name]\` to get info on a specific command!`);
			commands.forEach(command => {
				embed.addField(`${command.name}`, `Aliases: ${command.aliases.join(', ')} \n ${command.description}`);
			});

			return message.channel.send(embed);
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		let response = '';

		if(command.aliases) {
			response += `**Aliases:** ${command.aliases.join(', ')} \n`;
		}
		if(command.description) {
			response += `**Description:** ${command.description} \n`;
		}
		if(command.usage) {
			response += `**Usage:** ${prefix} ${command.name} ${command.usage} \n`;
		}

		response += `**Cooldown:** ${command.cooldown || 3} second(s)`;

		embed.addField(`${command.name}`, response);
		message.channel.send(embed);
	},
};