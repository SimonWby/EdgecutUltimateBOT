const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, ticket, executor, oldName, newName) => {

    if (!config.Tickets.Logs.Enabled) return;

    let guild = bot.guilds.cache.get(ticket.guild);
    let logs = Utils.findChannel(config.Tickets.Logs.Channel, guild);

    if (!logs) return;

    logs.send(Utils.Embed({
        title: lang.TicketModule.Logs.Tickets.Renamed.Title,
        fields: [
            { name: lang.TicketModule.Logs.Tickets.Renamed.Fields[0], value: `${ticket.channel_name} \n <#${ticket.channel_id}>` },
            { name: lang.TicketModule.Logs.Tickets.Renamed.Fields[1], value: executor },
            { name: lang.TicketModule.Logs.Tickets.Renamed.Fields[2], value: oldName },
            { name: lang.TicketModule.Logs.Tickets.Renamed.Fields[3], value: newName }
        ],
    }));
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847