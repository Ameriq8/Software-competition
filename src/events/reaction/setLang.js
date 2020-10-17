const BaseEvent = require('../../utils/structures/BaseEvent');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  async run (client, messageReaction, user) {
    if(user.bot) return;
    const ReactinKey = await db.fetch(`Reaction_Lang_(Message)_${messageReaction.message.id}`) || "None"
    const UserKey = await db.fetch(`Reaction_Lang_(Author)_${user.id}`) || "None"

  if(messageReaction.message.id == ReactinKey) {
    if(user.id == UserKey){
      if(messageReaction.emoji.name == "🇸🇦"){
        db.set(`Server_lang_${messageReaction.message.guild.id}`, "ar")
        db.delete(`Reaction_Lang_(Author)_${user.id}`)
        db.delete(`Reaction_Lang_(Message)_${messageReaction.message.id}`)
        messageReaction.message.reactions.removeAll()
let embed = new Discord.MessageEmbed()
.setTitle(`تم اختيار الغة العربية.`)
.setColor('#085a31')
.setThumbnail(`http://www.prozzone.com/images/flags_large/flag_sa.gif`)
.setDescription(`**تم اختيار الغة ** *\` العربية \`* ** | 🇸🇦**`)
       return messageReaction.message.edit(embed)

      }
      if(messageReaction.emoji.name == "🇺🇸"){ 
      
        db.set(`Server_lang_${messageReaction.message.guild.id}`, "en")
        db.delete(`Reaction_Lang_(Author)_${user.id}`)
        db.delete(`Reaction_Lang_(Message)_${messageReaction.message.id}`)
        messageReaction.message.reactions.removeAll()
let embed = new Discord.MessageEmbed()
.setColor('#bf0a30')
.setTitle(`The English language was chosen.`)
.setThumbnail(`http://www.jive.nl/jivewiki/lib/exe/fetch.php?cache=&media=expres:flag-us.png`)
.setDescription(`**Done Set To ** *\` Englisg \`* ** | 🇺🇸**`)
       return messageReaction.message.edit(embed)
        
      }
      if(messageReaction.emoji.name == "🇹🇷"){ 
      
        db.set(`Server_lang_${messageReaction.message.guild.id}`, "tr")
        db.delete(`Reaction_Lang_(Author)_${user.id}`)
        db.delete(`Reaction_Lang_(Message)_${messageReaction.message.id}`)
        messageReaction.message.reactions.removeAll()
let embed = new Discord.MessageEmbed()
.setColor('#bf0a30')
.setTitle(`Türk dili seçildi.`)
.setThumbnail(`https://flagpedia.net/data/flags/w580/tr.webp`)
.setDescription("**🇹🇷 | Tamamlandı Ayarlandı *` Türk `* dil.**")
       return messageReaction.message.edit(embed)
        
      }
    }
    
  }
    
    

  }
}
