import Discord from 'discord.js';
import Command from "../types/Command";

const GrantRoleCommand: Command = {
  name: 'role',
  aliases: ['r', 'role'],
  description: 'ロール付与',
  minArgs: 1,
  maxArgs: 1,
  execute: async (message: Discord.Message, args: string[]) => {
    const member = message.member;
    if (!member) {
      await message.channel.send(`ロール付与に失敗したぴょん`);
      return;
    }

    const memberName = member.nickname ? member.nickname : member.displayName;

    const roleName = args[0];
    const roleNames = member.guild.roles.cache.map((role) => { return role.name });

    if (roleNames.includes(roleName)) {
      if (member.roles.cache.size <= 1) {
        member.guild.roles.cache.forEach(async (role) => {
          if (role.name === roleName) {
            await member.roles.add(role.id);
            await message.channel.send(`${memberName}に「${role.name}」ロールを付与したぴょん`);
          }
        });
        return;
      }

      member.guild.roles.cache.forEach(async (role) => {
        if (role.name === roleName) {
          const memberRoleIds = member.roles.cache.map((role) => { return role.id });

          if (memberRoleIds.includes(role.id)) {
            await member.roles.remove(role.id);
            await message.channel.send(`${memberName}の「${role.name}」ロールを削除したぴょん`);
          } else {
            await member.roles.add(role.id);
            await message.channel.send(`${memberName}に「${role.name}」ロールを付与したぴょん`);
          }
        }
      });
      return;
    }

    await message.channel.send(`ロールが作成されてないぴょん`);
  }
}

export default GrantRoleCommand