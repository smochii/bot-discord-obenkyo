"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageEvent_1 = __importDefault(require("./MessageEvent"));
const ReadyEvent_1 = __importDefault(require("./ReadyEvent"));
const VoiceStateUpdateEvent_1 = __importDefault(require("./VoiceStateUpdateEvent"));
const _Events = [
    ReadyEvent_1.default,
    MessageEvent_1.default,
    VoiceStateUpdateEvent_1.default
];
exports.default = _Events;
