require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()
const handlers = require('./handlers')

const token = process.env.DISCORD_TOKEN

client.on('ready', () => {
	client.user.setUsername('Cheeeze')
	client.user.setAvatar('./cheeeze/images/cheeeze.png')
});

// Event Handlers
handlers(client)
/* 
** Example **
client.on('message', msg => {
    if (msg.content === 'ping') {
        //shello.bbb(msg);
        //msg.reply('pong');
    }
});
*/
client.login(token)
    .then(() => console.log('[Discord] Connected to the WebSocket!'))
    .catch(console.error);
