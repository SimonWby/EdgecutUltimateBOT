const Discord = require("discord.js");
const Utils = require("../../modules/utils.js")
const Embed = Utils.Embed;
const {config, lang, embeds} = Utils.variables;

module.exports = {
  name: 'ip',
  run: async (bot, message, args) => {
    message.channel.send(Utils.setupEmbed({
      configPath: embeds.Embeds.IP
    }));
  },
  description: "View the Minecraft server's IP",
  usage: 'ip',
  aliases: [
    'serverip'
  ]
}

// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847