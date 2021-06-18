import Discord from 'discord.js';
import Command from "../types/Command";

const DebugCommand: Command = {
  name: 'debug',
  aliases: ['d'],
  description: 'debug',
  minArgs: 0,
  maxArgs: 0,
  execute: async (message: Discord.Message) => {
    message.guild?.roles.cache.forEach((role) => {
      if (role.id === '832150534496321576') {
        console.log(role.name);
      }
    });
    
  }
}

export default DebugCommand