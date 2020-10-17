const BaseEvent = require('../../utils/structures/BaseEvent');
const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionRemove');
  }
  async run (client, message, user) {

    
    if(message.message.id !== "735121043152175156") return;
    if(message.emoji.name == ''){
         await message.message.guild.members.cache.get(user.id).roles.remove("") 

    }
    if(message.emoji.name == ''){
         await message.message.guild.members.cache.get(user.id).roles.remove("") 

    }

    
  }
}
