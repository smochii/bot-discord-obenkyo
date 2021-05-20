"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const dotenv_1 = __importDefault(require("dotenv"));
const _Events_1 = __importDefault(require("./events/_Events"));
dotenv_1.default.config();
const client = new discord_js_1.default.Client();
const TOKEN = process.env.TOKEN;
if (typeof TOKEN === 'undefined') {
    console.log("Please create .env file and define 'TOKEN'.");
    process.exit(1);
}
_Events_1.default.forEach((event) => {
    client.on(event.name, event.listener);
});
client.login(TOKEN);
