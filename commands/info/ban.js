module.exports = {
    name: 'ban',
    description: 'Bans a user',
    run: (client, message, args) => {
        console.log('works')
        const { MessageEmbed } = require('discord.js');
        const { stripIndents } = require('common-tags');
        
        module.exports = {
            name: 'ban',
            description: 'Bans a user',
            run: (client, message, args) => {
                const aChannel = message.guild.channels.cache.find(channel => channel.name === 'admin-log');
                const bMember = message.mentions.members.first();
                const reason = args.slice(1).join(' ');
        
                if (!bMember.bannable) return message.channel.send('I cannot ban this user');
        
                bMember.ban();
        
                const bEmbed = new MessageEmbed()
                    .setThumbnail(bMember.displayAvatarURL({ dynamic: true }))
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor('#FF0000')
                    .addField('Member Banned', stripIndents`**> Banned member:** ${bMember}
                    **> Banned by:** ${message.author}
                    **> Reason:** ${reason}`, true)
        
                    .setTimestamp();
        
                aChannel.send({ embeds: [bEmbed] });
            }
        }
    }
}
