const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'kick',
	description: 'Kicks a user',
	run: (client, message, args) => {
		const aChannel = message.guild.channels.cache.find(channel => channel.name === 'admin-log');
		const kMember = message.mentions.members.first();
		const reason = args.slice(1).join(' ');

		if (!client.owners.includes(message.author.id)) return message.channel.send('You do not have permissions for this command.')
		if (!kMember) return message.channel.send('Please mention a user.');
		if (!reason) return message.channel.send('Please provide a reason.');
		if (!kMember.kickable) return message.channel.send('I cannot kick this user.');

		kMember.kick();

		const kEmbed = new MessageEmbed()
			.setThumbnail(kMember.displayAvatarURL({ dynamic: true }))
			.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
			.setColor('#FF0000')
			.addField('Member Kicked', stripIndents`**> Kicked member:** ${kMember}
			**> Kicked by:** ${message.author}
			**> Reason:** ${reason}`, true)

			.setTimestamp();

		aChannel.send({ embeds: [kEmbed] });
	}
}