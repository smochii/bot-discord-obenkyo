import Discord from 'discord.js';
import Dotenv from 'dotenv';
import _Events from './events/_Events';

Dotenv.config();

const client = new Discord.Client();

const TOKEN = process.env.TOKEN;

if(typeof TOKEN === 'undefined') {
  console.log("Please create .env file and define 'TOKEN'.");
  process.exit(1);
}

_Events.forEach((event) => {
  client.on(event.name, event.listener);
})

client.login(TOKEN);