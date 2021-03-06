const Utils = require('../../modules/utils');
const Embed = Utils.Embed;
const { config, lang } = Utils.variables;

module.exports = {
    name: "bans",
    run: async (bot, message, args) => {
        let bans = await message.guild.fetchBans();
        if (bans.size) {

            let page = +args[0] || 1;

            let display = await Promise.all(bans.map(async ban => {
                let info = lang.ModerationModule.Commands.Bans.List.Info.replace(/{user}/g, ban.user.tag).replace(/{id}/g, ban.user.id).replace(/{reason}/g, ban.reason ? ban.reason : lang.ModerationModule.Commands.Bans.List.NoReason)
                let punishmentData = await Utils.variables.db.get.getPunishmentsForUser(ban.user.id);
                punishmentData = punishmentData ? punishmentData.filter(punishment => punishment.type == 'ban') : [];

                if (!punishmentData.length) return info
                else {
                    let latestBan = punishmentData.find(punishment => punishment.time == Math.max(...punishmentData.map(punishment => punishment.time)));
                    let executor = message.guild.member(latestBan.executor);

                    return info + (latestBan ? lang.ModerationModule.Commands.Bans.List.ExtraInfo.replace(/{date}/g, (new Date(latestBan.time).toLocaleString())).replace(/{executor}/g, executor ? executor : latestBan.executor).replace(/{id}/g, latestBan.id) : "")
                }
            }))

            if (page > Math.ceil(display.length / 10)) page = 1;

            display = display.slice((page - 1) * 10, page * 10)

            return message.channel.send(Embed({
                title: lang.ModerationModule.Commands.Bans.List.Title.replace(/{current-page}/g, page).replace(/{max-pages}/g, Math.ceil(display.length / 10)),
                description: display.join("\n\n")
            }))
        } else {
            return message.channel.send(Embed({
                title: lang.ModerationModule.Commands.Bans.NoBans.Title,
                description: lang.ModerationModule.Commands.Bans.NoBans.Description
            }))
        }
    },
    description: "View a list of currently banned users",
    usage: "bans [page number]",
    aliases: ['banlist']
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847