module.exports = async (bot) => {
    return new Promise(async resolve => {
        let warnings = [];

        if (bot.guilds.cache.size > 1) {
            warnings.push("Your bot is in more than 1 server. Corebot does not support this and you may encounter issues.");
        }

        await Promise.all(
            bot.guilds.cache.map(async guild => {
                return new Promise(async resolve => {
                    const missing = await require('./getMissingRolesAndChannels')(bot, guild);

                    if (missing.roles.length > 0) {
                        warnings = [...warnings, ...missing.roles.map(r => `GUILD: ${guild.name} (${guild.id}) | The ${r.name} role does not exist in your server. Setting: ${r.setting}`)];
                    }

                    if (missing.channels.text.length > 0) {
                        warnings = [...warnings, ...missing.channels.text.map(c => `GUILD: ${guild.name} (${guild.id}) | The ${c.name} Text Channel does not exist in your server. Setting: ${c.setting}`)];
                    }

                    if (missing.channels.voice.length > 0) {
                        warnings = [...warnings, ...missing.channels.voice.map(c => `GUILD: ${guild.name} (${guild.id}) | The ${c.name} Voice Channel does not exist in your server. Setting: ${c.setting}`)];
                    }

                    if (missing.channels.categories.length > 0) {
                        warnings = [...warnings, ...missing.channels.categories.map(c => `GUILD: ${guild.name} (${guild.id}) | The ${c.name} Category does not exist in your server. Setting: ${c.setting}`)];
                    }

                    resolve();
                })
            })
        )

        resolve(warnings);
    })
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847