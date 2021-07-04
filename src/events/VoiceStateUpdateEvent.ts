import Discord from 'discord.js';
import Redis from 'ioredis';
import Event from "../types/Event";

const textChannelId = '844854918368198667';
const redis = new Redis(process.env.REDIS_URL);

const VoiceStateUpdateEvent: Event = {
  name: 'voiceStateUpdate',
  listener: async (oldState: Discord.VoiceState, newState: Discord.VoiceState) => {
    if (!newState.member || newState.member.user.bot) {
      return;
    }

    let joinTimestamp = await redis.get(newState.member.id);

    if (newState.member.voice.channel) {
      if (!joinTimestamp) {
        const timestamp = Date.now();
        await redis.set(newState.member.id, timestamp.toString());
      }
    } else {
      if (joinTimestamp) {
        const timestamp = Date.now();
        const connectTime = Math.floor((timestamp - Number(joinTimestamp)) / 1000);
        await redis.del(newState.member.id);

        const name = newState.member.nickname ? newState.member.nickname : newState.member.displayName;
        const h = Math.floor(connectTime / 3600);
        const m = Math.floor(connectTime / 60) % 60;
        const s = connectTime % 60;

        const textChannel = newState.client.channels.cache.get(textChannelId) as Discord.TextChannel;
        textChannel.send(`${name} は \`${h ? h + '時間' : ''}${m ? m + '分' : ''}${s}秒\` くらい勉強してたぴょん`);
      }
    }
  }
}

export default VoiceStateUpdateEvent