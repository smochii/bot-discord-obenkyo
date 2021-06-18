import Discord from 'discord.js';
import Command from "../types/Command";

const CreateRoleCommand: Command = {
  name: 'role',
  aliases: ['cr', 'create-role'],
  description: 'ロール作成',
  minArgs: 1,
  maxArgs: 2,
  execute: async (message: Discord.Message, args: string[]) => {
    const member = message.member;
    const roleName = args[0];
    let roleColor = args[1];

    if (!member) {
      await message.channel.send(`ロール作成に失敗したぴょん`);
      return;
    }
    if (roleColor && !roleColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)) {
      await message.channel.send(`第2引数のカラーコードがおかしいぴょん`);
      return;
    }
    if (!roleColor) {
      roleColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }

    let isExist = false;
    message.guild?.roles.cache.forEach((role) => {
      if (role.name === roleName) {
        isExist = true;
      }
    });

    if (isExist) {
      await message.channel.send(`「${roleName}」ロールは既に作成されてるぴょん`);
      return;
    }

    const newRole = await member.guild.roles.create({ data: { name: roleName, color: roleColor } });
    await message.channel.send(`「${newRole.name}」ロールを作成したぴょん`);
  }
}

export default CreateRoleCommand