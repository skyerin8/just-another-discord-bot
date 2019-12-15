const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs'); //file structure

const {token, prefix} = require('./auth.json');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (var file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!` + 'I am ready to go!');
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    client.user.setActivity('minecraft C418', { type: 'LISTENING' });
});

client.on('message', async message => {
	if (message.content.includes('69')){
		message.channel.send('Nice!');
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', 'your error:' + error.message);
});

client.login(token); 