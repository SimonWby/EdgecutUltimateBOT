const Discord = require("discord.js");
const Utils = require("../../modules/utils.js")
const Embed = Utils.Embed;
const config = Utils.variables.config;
const lang = Utils.variables.lang;
const closeTicket = require('../../modules/methods/closeTicket');


module.exports = {
    name: 'close',
    run: async (bot, message, args) => {
        closeTicket(bot, args, message.member, message.channel);
    },
    description: "Close the ticket you are typing in",
    usage: 'close [reason]',
    aliases: [
        'ticketclose',
        'closeticket'
    ]
}
// 319213   8501   2541847    63250   1633182185   68469d36b26b702c71dcc43c2fff60c46b8742a1   2541847