const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const cm = require('comma-number');

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("doc", "testing", []);
  }

  async run(client, message) {

    let dev = ["442032295214579712", "508449321176268801"]
    
            //if (message.author.id !== '508449321176268801' || message.author.id !== '442032295214579712') return;
        if (!dev.includes(message.author.id)) return; 
    const prefixData = require('../../database/prefix');
    const preixsize = await prefixData.count();
    const CoinsDatra = require('../../database/coins');
    const CoinsSize = await CoinsDatra.count();
    
    
    
    
    
    
    
    
    message.channel.send(`
**\`\`\`ini
> Prefix:[ ${cm(preixsize)} ]#SERVERS
> Coins:[ ${cm(CoinsSize)} ]#USERS 
> \`\`\`**
`)

    
    
  }
};
