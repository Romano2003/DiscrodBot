const { writeFileSync } = require('fs');
const users = require('../../users.json');


module.exports = {
	name: 'register',
	description: 'Register a user',
	run: async (client, message, args) => {
		if (users[message.author.id]) return message.channel.send('You are already registered.')

		users[message.author.id] = {
			xp: 0,
			level: 1
		};

		const filter = m => m.author.id === message.author.id;

		message.channel.send('What is your favorite game?')
		await message.channel.awaitMessages({ filter, max: 1, time: 20_000 })
			.then(collected => users[message.author.id].game = collected.first().content);

		message.channel.send('What is your username?');
		await message.channel.awaitMessages({ filter, max: 1, time: 20_000 })
			.then(collected => users[message.author.id].username = collected.first().content);

		message.channel.send('What console do you play on (or PC)');
		await message.channel.awaitMessages({ filter, max: 1, time: 20_000 })
			.then(collected => users[message.author.id].console = collected.first().content);	

		writeFileSync(__dirname + '../../../users.json', JSON.stringify(users));
		message.channel.send('You have been registered.')
	}
}