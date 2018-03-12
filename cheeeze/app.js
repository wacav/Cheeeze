require('dotenv').config()

const Discord = require('discord.js');
const token = process.env.DISCORD_TOKEN
const client = new Discord.Client();

const hello = require('./handlers')(client);


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        //shello.bbb(msg);
        //msg.reply('pong');
    }
});

client.login(token)
    .then(() => console.log('[Discord] Connected to the WebSocket!'))
    .catch(console.error);

module.exports = client;