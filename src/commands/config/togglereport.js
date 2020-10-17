const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const welcData = require("../../database/report.js");

const db = require('quick.db');

module.exports = class TestCommand extends BaseCommand {

  constructor() {

    super("report-status", "testing", []);

  }

  async run(client, message, args) {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")

  
    welcData.findOne({
      guild : message.guild.id
    }, async(err, guild) => {
      
     if(err) console.log(err)
      
     
      if(guild) {
         if(guild.status == false && args[0] == 'Off') return message.channel.send(`is on alwways`)
      if(guild.status == true && args[0] == 'On') return message.channel.send(`is on alwways`)

      
        if(args[0] == 'Off'){
          guild.status = false
          await guild.save();
        message.channel.send(`Turnd Off`);


        } else if(args[0] == 'On'){
          guild.status = true
          await guild.save();
          message.channel.send(`Turnd on`);

          
        } else {
          return message.channel.send('On or Off')
        }
      } else {
        return message.channel.send(`there is no data bro`)
      }
    })
  }

};

