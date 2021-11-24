const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { readdirSync, writeFileSync } = require('fs');
const { stripIndents } = require('common-tags');
const { token, prefix, owners } = require('./config.json');

const client = new Client({ intents: new Intents(32767) });

client.commands = new Collection();
client.aliases = new Collection();

client.categories = readdirSync('./commands/');

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.owners = owners;

client.once('ready', () => {
	console.log(`${client.user.username} is ready!`);

	client.user.setPresence({ activities: [{ name: 'porn', type: 'WATCHING' }], status: 'dnd' });
});

// XP system
client.on('messageCreate', async message => {
	const users = require('./users.json');

	if (message.content.startsWith(prefix)) return;
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.member) message.member = await message.guild.members.fetchMember(message);
	if (!users[message.author.id]) return;

	const xpAdd = Math.floor(Math.random() * 7) + 8;
	const curxp = users[message.author.id].xp;
	const curlvl = users[message.author.id].level;
	const nxtlvl = curlvl * 100;

	users[message.author.id].xp = curxp + xpAdd;

	if (curxp + xpAdd >= nxtlvl) {
		users[message.author.id].level = curlvl + 1;
		users[message.author.id].xp = curxp + xpAdd - nxtlvl;
		
		const lvlEmbed = new MessageEmbed()
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
			.setColor('RANDOM')
			.addField('Level Up', stripIndents`**> Member:** ${message.author}
			**> New Level:** ${curlvl + 1}`, true)
			.setTimestamp();

		message.channel.send({ embeds: [lvlEmbed] })
	}

	writeFileSync(__dirname + '/users.json', JSON.stringify(users));
})

// Command Handler
client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member) message.member = await message.guild.members.fetchMember(message);

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) command.run(client, message, args);
});

client.login(token);