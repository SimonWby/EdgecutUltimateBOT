const Utils = require("../../modules/utils.js");
const Embed = Utils.Embed;
const config = Utils.variables.config;
const lang = Utils.variables.lang;

module.exports = {
    name: 'rolemenu',
    run: async (bot, message, args) => {
        if (args.length == 0) return message.channel.send(Embed({ preset: 'invalidargs', usage: module.exports.usage }));
        let menu = config.ReactionRoles.find(menu => menu.Name.toLowerCase() == args.join(" ").toLowerCase())
        if (!menu) return message.channel.send(Embed({ title: lang.AdminModule.Commands.Rolemenu.Embeds.InvalidMenu.Title, description: lang.AdminModule.Commands.Rolemenu.Embeds.InvalidMenu.Description, color: config.EmbedColors.Error }));

        let emojiroles = Object.keys(menu.EmojisToRoles).map((emoji, i) => {
            let e = bot.emojis.cache.find(em => em.id == emoji || em.toString() == emoji)
            if (e) return `${e.toString()} **${menu.EmojisToRoles[emoji]}**`
            else return `${emoji} **${menu.EmojisToRoles[emoji]}**`
        }).join('\n')

        message.channel.send(Utils.setupEmbed({
            configPath: menu.Embed,
            variables: [
                { searchFor: /{emojiroles}/g, replaceWith: emojiroles }
            ]
        })).then(async msg => {
            Object.keys(menu.EmojisToRoles).forEach(async emoji => {
                let e = bot.emojis.cache.find(em => em.id == emoji || em.toString() == emoji)
                await msg.react(e || emoji)
            })
        });
    },
    description: "Send the reaction role menu",
    usage: 'rolemenu <menu>',
    aliases: []
}

// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847