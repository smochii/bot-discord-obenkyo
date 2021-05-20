import Dotenv from 'dotenv';
import Event from "../types/Event";
import _Commands from '../commands/_Comands';

Dotenv.config();
const PREFIX = process.env.PREFIX;

if(typeof PREFIX === 'undefined') {
  console.log("Please create .env file and define 'PREFIX'.");
  process.exit(1);
}

const MessageEvent: Event = {
  name: 'message',
  listener: async message => {
    try {
      if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
      }
  
      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const alias = args.shift();
  
      if (!alias) {
        return;
      }
  
      for (const command of _Commands) {
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
  }
}

export default MessageEvent