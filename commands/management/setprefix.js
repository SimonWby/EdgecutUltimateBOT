const Utils = require("../../modules/utils.js");
const lang = Utils.variables.lang;
const config = Utils.variables.config;
const Embed = Utils.Embed;

module.exports = {
    name: 'setprefix',
    run: async (bot, message, args) => {
        if (args.length == 0) return message.channel.send(Embed({ preset: 'invalidargs', usage: module.exports.usage }));

        await Utils.variables.db.update.prefixes.updatePrefix(message.guild.id, args[0]);
        
        message.channel.send(Embed({
            title: lang.ManagementModule.Commands.Setprefix.Title,
            description: lang.ManagementModule.Commands.Setprefix.Description.replace(/{prefix}/g, args[0]),
            color: config.EmbedColors.Success
        }));
    },
    description: "Set the bot's prefix",
    usage: 'setprefix <prefix>',
    aliases: []
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847