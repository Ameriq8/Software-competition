const BaseCommand = require("../../utils/structures/BaseCommand");
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("sett", "Settings", [], "@setlang");
  }

  async run(client, message, anything, args) {
            if(!message.member.hasPermission('ADMINISTRATOR')){
    const lag = await client.db.fetch(`Server_lang_${message.guild.id}`) || "en"
    const lang = require('../../langs/' + lag)
  return message.channel.send(lang.Permissions.Else.author)

    }

    if(args == 'help'){
      try {
      let embed = new Discord.MessageEmbed()
     .setTitle(`Help : ${this.name|| "None"}`)
     .addField(`Name:`,`${this.name|| "None"}`, true)
     .addField(`Category:`,`${this.category|| "None"}`, true)
     .addField(`Usage:`,`${this.usage|| "None"}`, true)
     .addField(`Description:`,`${this.description || "None"}`, true)
     .addField(`**Aliases: [ 4 ]**`,`**${this.aliases.join(', ')|| "None"}**`, true)
     .setColor(`GOLD`)
     .setThumbnail(client.user.avatarURL())
     .setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.avatarURL())
     return message.channel.send(embed)
    } catch(e) {
      console.log(e)
    }
    }
    
let embed = new Discord.MessageEmbed()
.setTitle(`Chose a language | اختر لغة`)
.addField(`Languages | Diller | الغات`,`🇺🇸 | English ingilizce الانجليزيه\n🇸🇦 | Arabic Arapça العربية\n🇹🇷 | Turkish Türkçe التركية${this.ss}`)
.setFooter(`© ${client.user.username}, All Rights Reserved 2020`, client.user.avatarURL());
message.channel.send(embed).then(msg => {
  db.set(`Reaction_Lang_(Message)_${msg.id}`, msg.id)
  db.set(`Reaction_Lang_(Author)_${message.author.id}`,message.author.id)
  msg.react(`🇺🇸`)
  msg.react(`🇸🇦`)
  msg.react(`🇹🇷`)

})
  }

};
