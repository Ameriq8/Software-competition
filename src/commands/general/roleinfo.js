const BaseCommand = require("../../utils/structures/BaseCommand");

const { MessageEmbed } = require("discord.js");

module.exports = class TestCommand extends BaseCommand {

  constructor() {

    super("roleinfo", "testing", []);

  }

  async run(client, message, args) {

    const moment = require("moment");

    const permissions = {

      ADMINISTRATOR: "Administrator",

      VIEW_AUDIT_LOG: "View Audit Log",

      VIEW_GUILD_INSIGHTS: "View Server Insights",

      MANAGE_GUILD: "Manage Server",

      MANAGE_ROLES: "Manage Roles",

      MANAGE_CHANNELS: "Manage Channels",

      KICK_MEMBERS: "Kick Members",

      BAN_MEMBERS: "Ban Members",

      CREATE_INSTANT_INVITE: "Create Invite",

      CHANGE_NICKNAME: "Change Nickname",

      MANAGE_NICKNAMES: "Manage Nicknames",

      MANAGE_EMOJIS: "Manage Emojis",

      MANAGE_WEBHOOKS: "Manage Webhooks",

      VIEW_CHANNEL: "Read Text Channels & See Voice Channels",

      SEND_MESSAGES: "Send Messages",

      SEND_TTS_MESSAGES: "Send TTS Messages",

      MANAGE_MESSAGES: "Manage Messages",

      EMBED_LINKS: "Embed Links",

      ATTACH_FILES: "Attach Files",

      READ_MESSAGE_HISTORY: "Read Message History",

      MENTION_EVERYONE: "Mention @everyone, @here, and All Roles",

      USE_EXTERNAL_EMOJIS: "Use External Emojis",

      ADD_REACTIONS: "Add Reactions",

      CONNECT: "Connect",

      SPEAK: "Speak",

      STREAM: "Video",

      MUTE_MEMBERS: "Mute Members",

      DEAFEN_MEMBERS: "Deafen Members",

      MOVE_MEMBERS: "Move Members",

      USE_VAD: "Use Voice Activity",

      PRIORITY_SPEAKER: "Priority Speaker"};

    const role =

      message.mentions.roles.first() ||

      message.guild.roles.cache.get(args[0]);

    if (!role)

      return message.channel.send(

        "<a:Cross:733270664932491304> Please mention a role or provide a role ID."

      );

    const rolePermissions = role.permissions

      .toArray()

      .sort((a, b) => {

        return (

          Object.keys(permissions).indexOf(a) -

          Object.keys(permissions).indexOf(b)

        );

      })

      .map(p => "`" + permissions[p] + "`");

    const position = `\`${message.guild.roles.cache.size - role.position}\`/\`${

      message.guild.roles.cache.size

    }\``;

    const embed = new MessageEmbed()

      .setTitle("Role Information")

      .setThumbnail(message.guild.iconURL({ dynamic: true }))

      .addField("Role", role, true)

      .addField("Role ID", `\`${role.id}\``, true)

      .addField("Position", position, true)

      .addField("Hoisted", `\`${role.hoist}\``, true)

      .addField("Color", `\`${role.hexColor.toUpperCase()}\``, true)

      .addField("Members", `\`${role.members.size}\``, true)

      .addField("Mentionable", `\`${role.mentionable}\``, true)

      .addField(

        "Created On",

        moment(role.createdAt).format("MMM DD YYYY"),

        true

      )

      .addField(

        "Permissions",

        rolePermissions.length > 0 ? rolePermissions.join(", ") : "`None`"

      )

      .setFooter(

        message.member.displayName,

        message.author.displayAvatarURL({ dynamic: true })

      )

      .setTimestamp()

      .setColor(role.hexColor);

    message.channel.send(embed);

  }

};

