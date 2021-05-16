"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const RoleCommand_1 = __importDefault(require("./commands/RoleCommand"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client();
const commands = [
    RoleCommand_1.default
];
const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;
if (typeof PREFIX === 'undefined' || typeof TOKEN === 'undefined') {
    console.log("Please create .env file.");
    process.exit(1);
}
client.on("ready", () => {
    console.log("obenkyo bot ready...");
});
client.on("message", async (message) => {
    try {
        if (!message.content.startsWith(PREFIX) || message.author.bot) {
            return;
        }
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const alias = args.shift();
        if (!alias) {
            return;
        }
        for (const command of commands) {
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
});
client.login(TOKEN);
