"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PingCommand = {
    name: 'ping',
    aliases: ['ping'],
    description: 'ping',
    minArgs: 0,
    maxArgs: 0,
    execute: async (message) => {
        await message.channel.send(`pong`);
    }
};
exports.default = PingCommand;
