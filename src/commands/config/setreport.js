const BaseCommand = require("../../utils/structures/BaseCommand");
const ReaportData = require("../../database/report.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("setreport", "testing", []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**"
      );

    if (!args[0]) {
      let b = await db.fetch(`Report_${message.guild.id}`);

      let channelName = message.guild.channels.cache.get(b);

      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Report Channel Set In This Server Is \`${channelName.name}\`!**`
        );
      } else 
        return message.channel.send(
          "**<a:Cross:733270664932491304> Please Enter [Channel Id | Channel Name | mention channel] to set the report channel!**"
        );
    }

    let channel =
      message.mentions.channels.first() ||
      client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!channel || channel.type !== "text")
      return message.channel.send(
        "**<a:Cross:733270664932491304> Please Enter A Valid Text Channel!**"
      );

    try {
      let a = await db.fetch(`Report_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(
          "**<a:Cross:733270664932491304> This Channel is Already Set As Report Channel!**"
        );
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**<a:Check:733270880938885161> Report Channel Set!**");

        ReaportData.findOneAndUpdate(
          {
            guild: message.guild.id,
          },
          {
            guild: message.guild.id,
            channel: channel.id,
            status: true
          }, async(err, data) => {
            if(err) console.log(err)
            if(data) {
              data.channel = channel.id
              
            } else {
            const NewFuckingData = new ReaportData({
            guild: message.guild.id,
            channel: channel.id,
            status: true 
            })
           await NewFuckingData.save();
            }
          });
       // db.set(`Report_${message.guild.id}`, channel.id);

        message.channel.send(
          `**<a:Check:733270880938885161> Report Channel has Been Set Successfully in \`${channel.name}\`!**`
        );
      }
    } catch {
      return message.channel.send(
        "**<a:Cross:733270664932491304> Error: `Missing Permissions Or Channel Is Not A Text Channel!`**"
      );
    }
  }
};
