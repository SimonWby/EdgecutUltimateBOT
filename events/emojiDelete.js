const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, emoji) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0 && require('../modules/handlers/KeyHandler.js').verified) {
        if (!Utils.variables.config.Logs.Enabled.includes("EmojiDeleted")) return;
        
        const logs = Utils.findChannel(Utils.variables.config.Logs.Channels.EmojiDeleted, emoji.guild);
        
        logs.send(Utils.Embed({
            title: lang.LogSystem.EmojiDeleted.Title,
            fields: [
                {
                    name: lang.LogSystem.EmojiDeleted.Fields[0],
                    value: emoji.name
                }, {
                    name: lang.LogSystem.EmojiDeleted.Fields[1],
                    value: emoji.id
                }, {
                    name: lang.LogSystem.EmojiDeleted.Fields[2],
                    value: emoji.animated ? "Yes" : "No"
                }, {
                    name: lang.LogSystem.EmojiDeleted.Fields[3],
                    value: `[Click Here](${emoji.url})`
                }
            ],
            timestamp: Date.now()
        }))
    }
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847