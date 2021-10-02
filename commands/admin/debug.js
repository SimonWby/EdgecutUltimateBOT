const Utils = require("../../modules/utils.js");
const { Embed } = Utils;
const { config, lang } = Utils.variables;

module.exports = {
    name: "debug",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(Embed({ title: ':tools: Creating Debug Report', description: 'Your debug report is being generated' }));
        require('../../modules/methods/generateDebug')(bot)
            .then(url => {
                msg.edit(Embed({
                    title: ':white_check_mark: Debug Report Created', description: 'Please send this URL to the Corebot Support Team:\n' + url
                }))
            })
    },
    description: "Create a Corebot Debug Report",
    usage: "debug",
    aliases: []
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847