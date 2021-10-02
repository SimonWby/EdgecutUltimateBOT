const Utils = require('../modules/utils.js');
const config = Utils.variables.config;
const lang = Utils.variables.lang;

module.exports = async (bot, channel) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0 && require('../modules/handlers/KeyHandler.js').verified) {
        if (!channel.guild || !config.Logs.Enabled.includes("ChannelCreated")) return;
        if (channel.name.startsWith('ticket-') || channel.name.startsWith('application-')) return;

        const logs = Utils.findChannel(config.Logs.Channels.ChannelCreated, channel.guild);

        if (logs) logs.send(Utils.Embed({
            title: lang.LogSystem.ChannelCreated.Title,
            fields: [
                {
                    name: lang.LogSystem.ChannelCreated.Fields[0],
                    value: (channel.type == 'text' || channel.type == 'news' || channel.type == 'store') ? `<#${channel.id}>` : channel.name
                },
                {
                    name: lang.LogSystem.ChannelCreated.Fields[1],
                    value: channel.type.charAt(0).toUpperCase() + channel.type.substring(1)
                }
            ]
        }))

    }
}
// 319213   8501   2541847    N__%%   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847