const { getVoiceConnection } = require("@discordjs/voice");
const  fs  = require('fs');

module.exports = {
    name: 'volume',
    aliases: ['v'],
    description: 'changes the volume of the bot',
    execute(message, args, cmd, client, Discord) {

        if (args[0] == null || args[0] < 1 || args[0] > 100) return message.channel.send('Choose a volume between 1-100');

        vol  = args[0];

        try {

        //Sets volume
        const connection = getVoiceConnection(message.guild.id);
        resource = connection.state.subscription.player.state.resource;

        resource.volume.setVolume(vol/100);

        message.channel.send(`Volume has been set to **${vol + ' %'}** `);

        //Makes this the new default volume
        fs.writeFile('./defaultValues/volume.txt', (vol/100).toString(), 'utf-8', function() {})
        }
        catch(e) {
            console.log(e);
            message.channel.send('Nothing is playing or you are not in a voice channel or you did not enter a number');
        }

}

}