const { MessageEmbed } = require("discord.js")
const { stripIndents } = require('common-tags');
const users = require('../../users.json');

module.exports = {
	name: 'profile',
	description: 'Returns the profile of the user',
	run: (client, message, args) => {
		let pMember;
		if (!message.mentions.members.first()) {
			pMember = message.author
		} else {
			pMember = message.mentions.members.first();
		}

		if (!users[pMember.id]) return message.channel.send('This user is not registered.');

		const pEmbed = new MessageEmbed()
			.setThumbnail(pMember.displayAvatarURL({ dynamic: true }))
			.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
			.setColor('RANDOM')
			.addField('Profile', stripIndents`**> Member:** ${pMember}
			**> Favorite Game:** ${users[pMember.id].game}
			**> Username:** ${users[pMember.id].username}
			**> Console:** ${users[pMember.id].console}`, true)

			.addField('Level', stripIndents`**> Current XP:** ${users[pMember.id].xp}
			**> Current Level:** ${users[pMember.id].level}
			**> XP to next level:** ${users[pMember.id].level * 100 - users[pMember.id].xp}`, true)
			.setTimestamp();

		message.channel.send({ embeds: [pEmbed] })
	}
}