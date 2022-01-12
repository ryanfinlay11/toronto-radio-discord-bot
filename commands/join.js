const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: 'join',
    aliases: [],
    description: 'bot joins the call',
    execute(message, args, cmd, client) {

        try{

        joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            selfDeaf: false,
            adapterCreator: message.guild.voiceAdapterCreator
        })
        }
        catch(e) {
            message.channel.send('You are not in a voice channel');
        }

        
    }
}