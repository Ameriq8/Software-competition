const BaseCommand = require("../../utils/structures/BaseCommand");
const welcData = require("../../database/welcomer.js");
const { MessageEmbed } = require("discord.js");

const db = require("quick.db");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("setwelcomer", "testing", []);
  }

  async run(client, message, args) {
    
    
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );


    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) ||message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase());
    
    if(!channel) return message.channel.send("I can't find this channel");
    
    welcData.findOneAndUpdate(
      {
        guild: message.guild.id
      },
      {
        guild: message.guild.id,
        channel: channel.id,
        guildName: message.guild.name,
        status: true
      },
      async (err, guild) => {
        
        
        if (err) {
          console.log(err);
          message.channel.send(`There is an issue`)
        }

        if (guild) {
          
                  if(guild.channel == channel.id) {
                    
                    message.channel.send(`This channel is allready the welcome channel`)
                    message.channel.send(`if there is an issue cheak my perms or report bug`)                    
return;
                  }

          
                  client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**<a:Check:733270880938885161> Welcome Channel Set!**");
        message.channel.send(
          `**<a:Check:733270880938885161> Welcome Channel has Been Set Successfully in \`${channel.name}\`!**`
        );
          

        } else {
          const newData = new welcData({
            guild: message.guild.id,
            channel: channel.id,
            guildName: message.guild.name
          });
          await newData.save()
          message.channel.send(`ur config has been created`)
        }
      }
    );


  



     

      }
    } 

