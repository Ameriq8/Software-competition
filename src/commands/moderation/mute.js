const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("mute", "testing", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("**You Dont Have Permmissions To Mute Someone! - [MANAGE_GUILD]**");

    if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send("**I Don't Have Permissions To Mute Someone! - [MANAGE_GUILD]**")
    if (!args[0]) return message.channel.send("**<a:Cross:733270664932491304> Please mention someone.**");

    var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    if (!mutee) return message.channel.send("**<a:Cross:733270664932491304> Please Enter A Valid User To Be Muted!**");

    if (mutee === message.member) return message.channel.send("**<a:Cross:733270664932491304> You Cannot Mute Yourself!**")
    if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**<a:Cross:733270664932491304> Cannot Mute This User!**')

    let reason = args.slice(1).join(" ");
    if (mutee.user.bot) return message.channel.send("**<a:Cross:733270664932491304> Cannot Mute Bots!**");
    const userRoles = mutee.roles.cache
      .filter(r => r.id !== message.guild.id)
      .map(r => r.id)

    let muterole;
    let dbmute = await db.fetch(`muterole_${message.guild.id}`);
    let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

    if (!message.guild.roles.cache.has(dbmute)) {
      muterole = muteerole
    } else {
      muterole = message.guild.roles.cache.get(dbmute)
    }

    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          data: {
            name: "Muted",
            permissions: []
          }
        })
        message.guild.channels.cache.forEach(async (channel) => {
          await channel.createOverwrite(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK: false,
            CONNECT: false,
          })
        })
      } catch (e) {
        console.log(e);
      }
    };

    if (mutee.roles.cache.has(muterole.id)) return message.channel.send("**User Is Already Muted!**")

    db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
    try {
      mutee.roles.set([muterole.id]).then(() => {
        mutee.send(`**Hello, You Have Been Muted In ${message.guild.name} for - ${reason || "No Reason"}`).catch(() => null)
      })
    } catch {
      mutee.roles.set([muterole.id])
    }
 
      const sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription(`<a:Check:733270880938885161> ${mutee.user.username} was successfully muted\nReason: `)
      message.channel.send(sembed2);
    
  }
};