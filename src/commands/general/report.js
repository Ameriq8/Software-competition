const BaseCommand = require("../../utils/structures/BaseCommand");
const ReaportData = require("../../database/report.js");

const { MessageEmbed } = require("discord.js");

const moment = require("moment");

const db = require("quick.db");

const ms = require("ms");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("report", "testing", []);
  }

  async run(client, message, args) {
    
    
    ReaportData.findOne({
      guild: message.guild.id
    }, async(err, guild) => {
      if(err) console.log(err)
      if(guild) {
        
    const channel = message.guild.channels.cache.find(channe => channe.id === `${guild.channel}`);

        if(guild.status == false) {
         return message.channel.send(`IS DISABLED NOW`) 
        }
        
    if (!channel) return;


    var mention = message.mentions.users.first();

    if (!mention) return message.reply("**Please, mention a member.**");

    if (mention.bot) return message.reply("**You cant report bots.**");

    if (mention.id == message.author.id)
      return message.reply("**You cant report yourself**");

    if (message.guild.member(mention).hasPermission("MANAGE_GUILD"))
      return message.reply("**You cant report this user.**");

    if (mention.id == message.guild.owner.id)
      return message.reply("**You cant report the owner.**");

    var reason = args[1];

    if (!reason) return message.reply("**Please, specify a reason.**");

    var embed = new MessageEmbed()

      .setColor("GREEN")

      .setTitle(`New Report`)

      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))

      .addField(
        "Reporter:",
        `${message.author} \`(${message.author.id})\``,
        true
      )

      .addField("Reported:", `${mention} \`(${mention.id})\``, true)

      .addField("Reason:", ` ${reason}`, true)

      .addField("Channel:", `${message.channel}`, true)

      .addField(
        "Time:",
        `${moment(message.createdAt).format("D/MM/YYYY h:mm a")}`,
        true
      );

    channel.send(embed);

    // reportcooldown.add(message.author);

    message.channel.send("**<a:Check:733270880938885161> Thank you for reporting.**");

    //  db.set(`Reportcooldown_${message.author.id}`, Date.now());

      } else {
        message.channel.send('<a:Cross:733270664932491304> There is not fucking channel in the database')
      }
    })
    
   // let c = await db.fetch(`Report_${message.guild.id}`);

  }
};
