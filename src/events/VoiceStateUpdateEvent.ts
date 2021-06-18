import Discord from 'discord.js';
import Event from "../types/Event";

/**
 * とりあえず実現性見るために雑に実装してそのままな状態…
 * そのうち書き直す…
 */

const textChannelId = '844854918368198667';
const mockDB: any = {};

const VoiceStateUpdateEvent: Event = {
  name: 'voiceStateUpdate',
  listener: (oldState: Discord.VoiceState, newState: Discord.VoiceState) => {
    if (!newState.member || newState.member.user.bot) {
      return;
    }

    if (newState.member.voice.channel) {
      // join
      if (!Object.keys(mockDB).includes(newState.member.id)) {
        const timestamp = Date.now();
        mockDB[newState.member.id] = timestamp;
        console.log(mockDB);
      }
    } else {
      // exit
      if (Object.keys(mockDB).includes(newState.member.id)) {
        const timestamp = Date.now();
        const connectTime = Math.floor((timestamp - mockDB[newState.member.id]) / 1000);
        delete mockDB[newState.member.id];

        const name = newState.member.nickname ? newState.member.nickname : newState.member.displayName;
        const h = Math.floor(connectTime / 3600);
        const m = Math.floor(connectTime / 60) % 60;
        const s = connectTime % 60;

        const textChannel = newState.client.channels.cache.get(textChannelId) as Discord.TextChannel;
        textChannel.send(`${name} は \`${h ? h + '時間' : ''}${m ? m + '分' : ''}${s}秒\` くらい勉強してたぴょん`);

        console.log(mockDB);
      }
    }
  }
}

export default VoiceStateUpdateEvent