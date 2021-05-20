import Discord from 'discord.js';
import Command from "../types/Command";

const PingCommand: Command = {
  name: 'ping',
  aliases: ['ping'],
  description: 'ping',
  minArgs: 0,
  maxArgs: 0,
  execute: async (message: Discord.Message) => {
    await message.channel.send(`pong`);
  }
}

export default PingCommand