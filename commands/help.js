module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'list of all commands',
    execute(message, args, cmd, client, Discord) {
        //Embed constants
        const newEmbed = new Discord.MessageEmbed()
        .setAuthor('Toronto Radio', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')
        .setColor('#FF001C')
        .setThumbnail('https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')
        .setFooter('', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')

        //If not a valid help page, just send main help
        if (args[0]!=null && args[0]!='radio' && args[0]!='other') args[0] = null;

        //Main help
        if (args[0] == null) {
            newEmbed.addFields( 
                { name: '-help radio', value: 'Shows all radio commands' },
                { name: '-help other', value: 'Shows other commands' },
            )
            .setTitle('Commands')
            .setDescription('Help Directory')
        }

        //Radio help
        else if (args[0] == 'radio') {
            newEmbed.addFields( 
                { name: '-radio {name}', value: 'Plays the radio station' },
                { name: '-radio list', value: 'Lists all radio stations' },
                { name: '-volume {1-100}', value: 'Changes the volume' },
                { name: '-stop', value: 'Stops the player' },
            )
            .setTitle('Radio Help')
            .setDescription('All radio commands')
        }

        //Other help
        else if (args[0] == 'other') {
            newEmbed.addFields( 
                { name: '-join', value: 'Bot joins the call' },
            )
            .setTitle('Other Help')
            .setDescription('All other commands')
        }

        message.channel.send( { embeds: [newEmbed]} );

    }
}