const BaseCommand = require("../../utils/structures/BaseCommand");
const db = (module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("ban", "testing", []);
  }

  async run(client, message, args) {
    const lag = await client.db.fetch(`Server_lang_${message.guild.id}`) || "en"
    const lang = require('../../langs/'+ lag)

    let member = message.mentions.members.last();
    if(!member) return message.channel.send(`**<a:Cross:733270664932491304> Plz Mention some one!**`)
    let memberrole = member.roles.highest || 0
    let authorrole = message.member.roles.highest || 0
    let botrole = message.guild.member(client.user).roles.highest
    let memberRole = message.guild.roles.cache.find(role => role.id == memberrole).position || 0
    let authorRole = message.guild.roles.cache.find(role => role.id == authorrole).position || 0
    let botRole = message.guild.roles.cache.find( role => role.id == botrole).position || 0
    console.log(`${botRole}, ${memberRole}, ${authorRole}`)
    
  if(message.author.id !== message.guild.ownerID){
        if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(lang.Permissions.Kick.auhtor);
    }
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return message.channel.send(lang.Permissions.Kick.client);
    }
    if(authorRole <= memberRole){
      message.channel.send(`**<a:Cross:733270664932491304> You can't ban this member**`)
    }
    if(botRole <= memberRole){
      return message.channel.send(`**<a:Cross:733270664932491304> I can\'t ban this member**`)
    }
  }
    // member.ban().then(() => {
    //   message.channel.send(`**<a:Check:733270880938885161> \` *${member.user.tag}* \` add to ban list**`)
    // }).catch(err => {
    //   console.log(err)
    // })
      message.channel.send(`> **<a:Check:733270880938885161> *${member.user.tag}*, add to ban list**`)

    
      
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return message.channel.send("**<a:Cross:733270664932491304> I don't have `BAN_MEMBERS` permission**");
    }
  }
});
