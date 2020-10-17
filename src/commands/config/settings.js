const BaseCommand = require("../../utils/structures/BaseCommand");
const prefixData = require("../../database/settings");

const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("settings00", "testing", []);
  }

  async run(client, message) {
    
    let embed = new MessageEmbed().setTitle("Server Settings");
    await prefixData.findOne(
      {
        ServerId: message.guild.id
      },
      async (err, prefix) => {
        if (err) console.log(err);
        if (prefix) {
          embed.addField(
            "Global Settings: ",
            `**Server Name:** ${message.guild.name}\n**Server ID:** ${message.guild.id}\n**Prefix:** ${prefix.prefix}\n**Server Region:** ${regions[
          message.guild.region
        ] || message.guild.region}`
          );
        } else {
          embed.addField(
            "Global Settings: ",
            `**Server Name:** ${message.guild.name}\n**Server ID:** ${message.guild.id}\n**Prefix:** ${prefix.prefix}\n**Server Region:** ${regions[
          message.guild.region
        ] || message.guild.region}`
          );
        }
      }
    );
    
    embed
      .addField("Channels: ", `Welcome: ${w ? `<#${w}>` : 'None'}\nReport: ${r ? `<#${r}>` : `None`}`)
      .addField("Status: ", `Report: ${ww}\nReport: ${rr}\nAutoRole:`)
      .setColor("#FFFFFF")
      .setFooter(
        `© ${client.user.username}, All Rights Reserved 2020`,
        client.user.avatarURL()
      );
    message.channel.send(embed);
  }
};
