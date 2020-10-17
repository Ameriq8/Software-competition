const BaseCommand = require("../../utils/structures/BaseCommand");
const { MessageEmbed } = require("discord.js");
module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("clear", "testing", []);
  }

  async run(client, message) {
    try {
      const lag =
        (await client.db.fetch(`Server_lang_${message.guild.id}`)) || "en";
      const lang = require("../../langs/" + lag);

      let args = message.content.substring(1).split(" ");
      message.delete();
      if (
        !message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")
      )
        return message.channel.send(lang.Permissions.Else.author);
      if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(lang.Permissions.Else.clinet);
      if (!args[1]) {
        message.channel.messages.fetch().then(messages => {
          message.channel.bulkDelete(messages);
          let msgs = messages.array().length;
          let embed = new MessageEmbed()
            .setDescription(`**${lang.Deleting}**`)
            .setColor("#2aa198");
          message.channel.send(embed).then(msg => {
            setTimeout(function() {
              let msgmasmgsmgm = new MessageEmbed()
                .setDescription(`**${lang.clearJS.replace("[msgs]", msgs)}**`)
                .setColor("#2aa198");
              msg.edit(msgmasmgsmgm);
            }, 1500);
            setTimeout(function() {
              msg.delete();
            }, 5000);
          });
        });
      }
    } catch (e) {
      client.Error.log(`There is an error in the clear command`);
    }
  }
};
