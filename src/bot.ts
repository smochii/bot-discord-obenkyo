import Discord from 'discord.js';
import Dotenv from 'dotenv';
import Command from './commands/Command';
import RoleCommand from './commands/RoleCommand';

Dotenv.config();

const client = new Discord.Client();

const commands: Command[] = [
  RoleCommand
]

const PREFIX = process.env.PREFIX;
const TOKEN = process.env.TOKEN;

if(typeof PREFIX === 'undefined' || typeof TOKEN === 'undefined') {
  console.log("Please create .env file.");
  process.exit(1);
}

client.on("ready", ()=> {
  console.log("obenkyo bot ready...");
});

client.on("message",async message => {
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
  } catch(e) {
    await message.channel.send('なんかバグったぴょん');
    console.log(e);
  }
});

client.login(TOKEN);