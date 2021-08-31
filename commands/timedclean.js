const { SlashCommandBuilder } = require('@discordjs/builders')
const ms = require('ms')
const thirtyMinutes= 1800000
const seconds =15000

module.exports ={
  data: new SlashCommandBuilder()
  .setName('timedclean')
  .setDescription('Delete 100 messages every set amount of hrs.')
  .addStringOption(option => option.setName('hrs').setDescription('Number hrs before deletes run again.')),
  // .addStringOption(option => option.setName('remove').setDescription('Stop Timer? Yes or No.')),

  async execute(interaction){
    const hrs = interaction.options.getString('hrs')
    const msHours = ms(`${String(hrs)}m`)
    let remove = 'no'
    // remove = interaction.options.getString('remove')
    
    // if(remove === 'yes' || 'y' || 'Yes') return

function warningMessage(){
  setTimeout(() =>{
    interaction.channel.send('Warning: Chat will clear in 30 minutes.')
    clearAll()
}, msHours)}

function clearAll(){
   setTimeout(async () => {
    await interaction.channel.bulkDelete(100).then(
      interaction.reply({ content: 'Successfully deleted 100 messages.', ephemeral: false })).then(msg => msg.delete(3000)),
      interaction.channel.send(`This chat is set to delete every ${interaction.options.getString('hrs')} hours.`)
      warningMessage()
   }, seconds)}

  if(msHours){
          interaction.channel.send(`This chat is set to delete every ${interaction.options.getString('hrs')} hours.`)
          warningMessage()
  }
}
}