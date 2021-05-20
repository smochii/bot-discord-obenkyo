import Discord from 'discord.js';

type Command = {
  name: string;
  aliases: string[];
  description: string;
  minArgs: number;
  maxArgs: number;
  execute: (message: Discord.Message, args: string[]) => void;
}

export default Command