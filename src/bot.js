const { Client } = require("discord.js");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const f = require("./cooldown");
const { registerCommands, registerEvents } = require("./utils/registry");
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.db = require("quick.db");
  await mongoose
    .connect(
      "MONGODB_URL",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .catch(err => console.log(err));
  // client.test = require('./webhook/weebhook.js')
  // client.logger = require('./webhook/loger')
  client.Error = require("./webhook/Error");
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, "../commands");
  await registerEvents(client, "../events");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

client.on("guildCreate", guild => {
  let server = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
  var embed = new Discord.MessageEmbed()
    .setColor(`GOLD`)
    .addField(
      `Thank You`,
      `Thank you for inviting me and I hope that you will join my support **[server](${server})** to know all new updates and announcements`
    )
    .setFooter(
      `© ${client.user.username}, All Rights Reserved 2020`,
      client.user.avatarURL()
    )
    .setTimestamp();
  guild.owner
    .send(embed)
    .then(function(p) {
      setTimeout(function() {
        p.edit({
          embed: new Discord.MessageEmbed()
            .addField(`Server checking`, `Server rooms are checking...`)
            .setColor("GOLD")
            .setFooter(
              `${client.user.username}, All Rights Reserved 2020`,
              client.user.avatarURL()
            )
        });
      }, 3000);
    })
    .then(function(p) {
      setTimeout(function() {
        p.edit({
          embed: new Discord.MessageEmbed()
            .addField(`Server checking`, `Server roles checking....`)
            .setColor("GOLD")
        });
      }, 3000);
    })
    .then(function(p) {
      setTimeout(function() {
        p.edit({
          embed: new Discord.MessageEmbed()
            .addField(
              `Server checking`,
              `The server has been successfully checked`
            )
            .setColor("GOLD")
        });
      }, 3000);
    });
});