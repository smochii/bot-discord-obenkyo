import Discord from 'discord.js';
import Command from "./Command";
import Role from '../Roles/Role';
import ProgramingRole from '../Roles/ProgramingRole';
import DesignRole from '../Roles/DesignRole';
import GameDesignRole from '../Roles/GameDesignRole';

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

    const aliases = args[0];

    let executed = false;
    for (const role of roles) {
      if (!role.aliases.includes(aliases)) {
        continue;
      }

      const roles = member.roles.cache.map((role) => { return role.id });
    
      if (roles.includes(ProgramingRole.id)) {
        await member.roles.remove(ProgramingRole.id);
        await message.channel.send(`「${ProgramingRole.name}」のロールを削除したぴょん`);
      } else {
        await member.roles.add(ProgramingRole.id);
        await message.channel.send(`「${ProgramingRole.name}」のロールを付与したぴょん`);
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