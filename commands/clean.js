const { SlashCommandBuilder } = require('@discordjs/builders')
const ms = require('ms')
const thirtyMinutes= 1800000

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clean')
		.setDescription('Delete up to 100 messages.')
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to clean up')),

	async execute(interaction) {
		const amount = interaction.options.getInteger('amount')

		if (amount <= 1 || amount > 101) {
			return interaction.reply({content: 'You need to input a number between 1 and 100.'})
		}

		await interaction.channel.messages.fetch({limit: amount}).then((messages)=>{
			interaction.channel.bulkDelete(messages)
			interaction.reply({content: `Cleaned up ${amount} messages.`})
		})
	},
}