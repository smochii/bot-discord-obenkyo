"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const textChannelId = '844854918368198667';
const mockDB = {};
const VoiceStateUpdateEvent = {
    name: 'voiceStateUpdate',
    listener: (oldState, newState) => {
        if (!newState.member) {
            return;
        }
        if (newState.member.voice.channel) {
            if (!Object.keys(mockDB).includes(newState.member.id)) {
                const timestamp = Date.now();
                mockDB[newState.member.id] = timestamp;
                console.log(mockDB);
            }
        }
        else {
            if (Object.keys(mockDB).includes(newState.member.id)) {
                const timestamp = Date.now();
                const connectTime = Math.floor((timestamp - mockDB[newState.member.id]) / 1000);
                delete mockDB[newState.member.id];
                const name = newState.member.nickname ? newState.member.nickname : newState.member.displayName;
                const h = Math.floor(connectTime / 3600);
                const m = Math.floor(connectTime / 60) % 60;
                const s = connectTime % 60;
                const textChannel = newState.client.channels.cache.get(textChannelId);
                textChannel.send(`${name} は \`${h ? h + '時間' : ''}${m ? m + '分' : ''}${s}秒\` くらい勉強してたぴょん`);
                console.log(mockDB);
            }
        }
    }
};
exports.default = VoiceStateUpdateEvent;
