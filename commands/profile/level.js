const { MessageEmbed } = require("discord.js")
const { stripIndents } = require('common-tags');
const users = require('../../users.json');

module.exports = {
	name: 'level',
	aliases: ['levels'],
	description: 'Returns the current level and xp of the user',
	run: (client, message, args) => {
		const lvlEmbed = new MessageEmbed()
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
			.setColor('RANDOM')
			.addField('Level', stripIndents`**> Member:** ${message.author}
			**> Current Level:** ${users[message.author.id].level}`, true)
			.addField(':D', stripIndents`**> Current XP:** ${users[message.author.id].xp}
			**> XP to next level:** ${users[message.author.id].level * 100 - users[message.author.id].xp}`, true)
			.setTimestamp();

		message.channel.send({ embeds: [lvlEmbed] })
	}
}