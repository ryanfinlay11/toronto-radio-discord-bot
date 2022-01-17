const Discord = require('discord.js');
const fs = require('fs');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], 
                            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER'],});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

token = fs.readFileSync('./token.txt', "utf-8");
client.login(token);
