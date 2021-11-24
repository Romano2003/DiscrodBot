module.exports = {
    name: 'ping',
    description: 'Returns latency and API ping',
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging....');

        msg.edit(`Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms
        API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}