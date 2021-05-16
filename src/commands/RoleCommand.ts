import Discord from 'discord.js';
import Command from "./Command";
import Role from '../roles/Role';
import ProgramingRole from '../roles/ProgramingRole';
import DesignRole from '../roles/DesignRole';
import GameDesignRole from '../roles/GameDesignRole';

const roles: Role[] = [
  ProgramingRole,
  DesignRole,
  GameDesignRole
]

const RoleCommand: Command = {
  name: 'role',
  aliases: ['r', 'role'],
  description: 'ロール付与',
  minArgs: 1,
  maxArgs: 1,
  execute: async (message: Discord.Message, args: string[]) => {
    let member = message.member;
    if (!member) {
      await message.channel.send(`ロール付与に失敗したぴょん`);
      return;
    }

    const alias = args[0];

    let executed = false;
    for (const role of roles) {
      if (!role.aliases.includes(alias)) {
        continue;
      }

      const roles = member.roles.cache.map((role) => { return role.id });
    
      if (roles.includes(role.id)) {
        await member.roles.remove(role.id);
        await message.channel.send(`「${role.name}」のロールを削除したぴょん`);
      } else {
        await member.roles.add(role.id);
        await message.channel.send(`「${role.name}」のロールを付与したぴょん`);
      }
      executed = true;
      return;
    }

    if (!executed) {
      await message.channel.send(`ロール付与に失敗したぴょん`);
    }
  }
}

export default RoleCommand