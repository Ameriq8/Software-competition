const BaseCommand = require('../../utils/structures/BaseCommand');
const db = require('quick.db')
const Discord = require('discord.js');
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('setregion', 'Select guild region', ['set-region']);
  }

  async run(client, message) {
     let args = message.content.split(" ").slice(1).join(" ")
  let rejoin = ['eu-central', 'us-central', 'frankfurt', 'sydney', 'us-south', 'us-east', 'eu-west', 'southafrica', 'india', 'amsterdam', 'japan', 'hongkong', 'us-west', 'london', 'singapore', 'russia', 'brazil', 'europe', 'south-korea', 'dubai']
  let rejoinDispay = ['eu-central', 'us-central', 'frankfurt', 'sydney', 'us-south', 'us-east', 'eu-west', 'southafrica', 'india', 'amsterdam', 'japan', 'hongkong', 'us-west', 'london', 'singapore', 'russia', 'brazil', 'europe', 'south-korea', 'dubai'].join(', ')

  if(!rejoin.includes(args)) return message.reply(`> \`\`\`${rejoinDispay}\`\`\`\nThis Rejons are avaibleL `) 
    message.channel.send("Done")
  message.guild.setRegion(args).catch(e => message.channel.send("There is an Error"))

  }
    
  }
