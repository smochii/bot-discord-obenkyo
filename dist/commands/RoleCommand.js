"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProgramingRole_1 = __importDefault(require("../roles/ProgramingRole"));
const DesignRole_1 = __importDefault(require("../roles/DesignRole"));
const GameDesignRole_1 = __importDefault(require("../roles/GameDesignRole"));
const roles = [
    ProgramingRole_1.default,
    DesignRole_1.default,
    GameDesignRole_1.default
];
const RoleCommand = {
    name: 'role',
    aliases: ['r', 'role'],
    description: 'ロール付与',
    minArgs: 1,
    maxArgs: 1,
    execute: async (message, args) => {
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
            const roles = member.roles.cache.map((role) => { return role.id; });
            if (roles.includes(ProgramingRole_1.default.id)) {
                await member.roles.remove(ProgramingRole_1.default.id);
                await message.channel.send(`「${ProgramingRole_1.default.name}」のロールを削除したぴょん`);
            }
            else {
                await member.roles.add(ProgramingRole_1.default.id);
                await message.channel.send(`「${ProgramingRole_1.default.name}」のロールを付与したぴょん`);
            }
            executed = true;
            return;
        }
        if (!executed) {
            await message.channel.send(`ロール付与に失敗したぴょん`);
        }
    }
};
exports.default = RoleCommand;
