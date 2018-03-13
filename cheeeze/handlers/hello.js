module.exports = client => {
    client.on("guildMemberAdd", member => {
        const channel = member.guild.channels.find('name', 'general');
		// Do nothing if the channel wasn't found on this server
		if (!channel) return;
		// Send the message, mentioning the member
		channel.send(`${member} 어서와 이 곳은 처음이지?`);
    })
};
