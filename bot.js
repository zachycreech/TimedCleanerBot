const fs = require('fs')
const {Client, Intents, Collection} = require('discord.js')
const config =require( './config.json')


console.clear()

const intents = [
  Intents.FLAGS.GUILDS, 
]

const client = new Client({intents})

client.commands = new Collection()

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.once('ready', () => {
	console.log('Ready!')
})

client.on("message", (message) =>{
  console.log(message.author.tag)
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		return interaction.channel.send('There was an error while executing this command!').then(message => message.delete(3000))
	}
})

client.login(config.token)

