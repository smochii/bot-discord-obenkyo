"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PingCommand_1 = __importDefault(require("./PingCommand"));
const RoleCommand_1 = __importDefault(require("./RoleCommand"));
const _Commands = [
    PingCommand_1.default,
    RoleCommand_1.default
];
exports.default = _Commands;
