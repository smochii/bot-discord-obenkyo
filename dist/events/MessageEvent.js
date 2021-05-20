"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const _Comands_1 = __importDefault(require("../commands/_Comands"));
dotenv_1.default.config();
const PREFIX = process.env.PREFIX;
if (typeof PREFIX === 'undefined') {
    console.log("Please create .env file and define 'PREFIX'.");
    process.exit(1);
}
const MessageEvent = {
    name: 'nessage',
    listener: async (message) => {
        try {
            if (!message.content.startsWith(PREFIX) || message.author.bot) {
                return;
            }
            const args = message.content.slice(PREFIX.length).trim().split(/ +/);
            const alias = args.shift();
            if (!alias) {
                return;
            }
            for (const command of _Comands_1.default) {
                if (!command.aliases.includes(alias)) {
                    continue;
                }
                if (args.length < command.minArgs ||
                    command.maxArgs < args.length) {
                    await message.channel.send('引数の数がおかしいぴょん');
                    return;
                }
                command.execute(message, args);
                return;
            }
        }
        catch (e) {
            await message.channel.send('なんかバグったぴょん');
            console.log(e);
        }
    }
};
exports.default = MessageEvent;
