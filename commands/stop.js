const { getVoiceConnection } = require("@discordjs/voice");
const fs = require("fs");

module.exports = {
    name: 'stop',
    aliases: [],
    description: 'The bot leaves the channel',
    execute(message, args, cmd, client) {

        try {
        const connection = getVoiceConnection(message.guild.id);

        connection.destroy();

        //Deletes all current gifs/dials
        imageIDs = fs.readFileSync('./defaultValues/imageIDs.txt', "utf-8");
        ids = imageIDs.split('\n');
        message.channel.messages.fetch(ids[1])
            .then(msg => msg.delete());
        message.channel.messages.fetch(ids[2])
            .then(msg => msg.delete());
        fs.writeFile('./defaultValues/imageIDs.txt', '', 'utf-8', function() {});

        client.user.setActivity('Toronto Radio Stations 😀', { type: 'PLAYING' });
        
        }
        catch(e) {
            console.log(e);
            message.channel.send('The bot is not playing anything right now');
        }

}

}