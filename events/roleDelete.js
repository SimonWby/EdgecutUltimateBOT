const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, role) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0 && require('../modules/handlers/KeyHandler.js').verified) {
        if (!Utils.variables.config.Logs.Enabled.includes("RoleDeleted")) return;

        const logs = Utils.findChannel(Utils.variables.config.Logs.Channels.RoleDeleted, role.guild);

        if (logs) logs.send(Utils.Embed({
            title: lang.LogSystem.RoleDeleted.Title,
            fields: [
                {
                    name: lang.LogSystem.RoleDeleted.Field,
                    value: role.name
                }
            ]
        }))
    }
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847