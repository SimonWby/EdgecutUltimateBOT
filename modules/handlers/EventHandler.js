const Utils = require('../utils.js');
const { error } = require('../utils.js');
const fs = require('fs');
module.exports = {
    events: [],
    find: function (name) {
        this.events.find(e => e.name.toLowerCase() == name.toLowerCase())
    },
    set: function (name, event) {
        if (!name || !event || !['[object Function]', '[AsyncFunction]', '[object AsyncFunction]'].includes({}.toString.call(event))) return error('Invalid event object.');
        function CallEvent(...args) {
            try {
                event(require('../variables').bot, ...args);
            } catch (err) {
                console.log(err);
            }
        }
        this.bot.on(name, CallEvent);

        const EventObject = {
            name,
            run: event,
            call: CallEvent
        }

        const caller = Utils.getLine(3) || "Unknown";

        if (caller.includes('\\addons\\')) {
            const name = caller.replace(/\\addons\\/g, '').match(/[^\.]+/)[0];
            EventObject.addonName = name;
        }

        this.events.push(EventObject);
    },
    init: function (bot) {
        this.bot = bot;
        fs.readdir('./events', function (err, files) {
            if (err) throw err;
            files
                .filter(f => f.endsWith('.js'))
                .forEach(event => {
                    module.exports.set(event.split(".js")[0], require('../../events/' + event));
                })
            console.log(Utils.infoPrefix + module.exports.events.length + ' events have been loaded.');

            return module.exports;
        })
    }
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847