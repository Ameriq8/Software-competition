const BaseCommand = require("../../utils/structures/BaseCommand");
const db = (module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super("kick", "testing", []);
  }

  async run(client, message, args) {
    const lag =
      (await client.db.fetch(`Server_lang_${message.guild.id}`)) || "en";
    const lang = require("../../langs/" + lag);

    let member = message.mentions.members.last();
    if (!member) return message.channel.send(lang.ProviedSomeOne);
    let memberrole = member.roles.highest || 0;
    let authorrole = message.member.roles.highest || 0;
    let botrole = message.guild.member(client.user).roles.highest;
    let memberRole =
      message.guild.roles.cache.find(role => role.id == memberrole).position ||
      0;
    let authorRole =
      message.guild.roles.cache.find(role => role.id == authorrole).position ||
      0;
    let botRole =
      message.guild.roles.cache.find(role => role.id == botrole).position || 0;
    console.log(`${botRole}, ${memberRole}, ${authorRole}`);

    if (message.author.id !== message.guild.ownerID) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send(lang.Permissions.Kick.author);
      }
      if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send(lang.Permissions.Kick.client);
      }
      if (authorRole <= memberRole) {
        message.channel.send(
          `<a:Cross:733270664932491304> You can't kick this member`
        );
      }
      if (botRole <= memberRole) {
        return message.channel.send(
          `<a:Cross:733270664932491304> I can\'t kick this member`
        );
      }
    }

    member
      .kick()
      .then(() => {
        message.channel.send();
      })
      .catch(err => console.log(err));

    let channel = db.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "kick")
      .addField("**User Kicked**", kickMember.user.username)
      .addField("**Kicked By**", message.author.username)
      .addField("**Reason**", `${reason || "**No Reason**"}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
});
