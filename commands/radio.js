const { joinVoiceChannel } = require("@discordjs/voice");
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource } = require('@discordjs/voice');
const fs = require("fs");

module.exports = {
        name: 'radio',
        aliases: ['r'],
        description: 'the bot plays radio stations',
        execute(message, args, cmd, client, Discord) {

            if(message.member.voice.channel.id == null) return ('You are not in a voice channel.');

            station = args[0];

            //Deletes the message the user sent
            message.delete();

            if (args[0] != 'list') {

                const stations = new Map();
                stations.set('virginradio', {
                    name: 'Virgin Radio',
                    link: 'https://24373.live.streamtheworld.com/CKFMFMAAC.aac?dist=bellmedia_iheartradio.ca_web&tdsdk=js-2.9&pname=TDSdk&pversion=2.9&banners=300x250%2C300x600%2C728x90%2C970x250&sbmid=161beeb6-7cb4-4836-cd79-d2f2ae033ebb',
                    image: 'https://imgur.com/VxdZsFc'
                });
                stations.set('z103.5', {
                    name: 'Z103.5',
                    link: 'https://ice23.securenetsystems.net/CIDC?starttime=1638257380',
                    image: 'https://imgur.com/3GOKUmm'
                });
                stations.set('chfi', {
                    name: 'CHFI',
                    link: 'https://rogers-hls.leanstream.co/rogers/tor981.stream/icy?environment=tunein&args=tunein_01&DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY0MDA1NDU0MSwiaXNzIjoidGlzcnYifQ.XV5yPTQX4lbr2CUb8cqtJjIHDn6ccsJMzL_Sx6NaouI',
                    image: 'https://imgur.com/mbdNQPT'
                });
                stations.set('q107', {
                    name: 'Q107',
                    link: 'https://corus.leanstream.co/CILQFM-MP3?args=tunein&DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTYzODQyMjU4NCwiaXNzIjoidGlzcnYifQ.Szt_fQ0EbhaPRQQSPTccDj-KLUHv7yzpmPANeJ5NIdw',
                    image: 'https://imgur.com/6n860wD'
                });
                stations.set('92.5', {
                    name: 'Kiss 92.5',
                    link: 'https://rogers-hls.leanstream.co/rogers/tor925.stream/icy?environment=tunein&args=tunein_01&DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY0MTI0Mjc1MSwiaXNzIjoidGlzcnYifQ.2YiyOmJXx22vlZP4ohCTq8ugdlsQJjnYrn1R4upehcA',
                    image: 'https://imgur.com/gSEE5RM'
                });
                stations.set('boom', {
                    name: 'Boom 97.3',
                    link: 'https://newcap.leanstream.co/CHBMFM?args=3rdparty_02&uid=1e625ba9-ab7d-4327-9e37-d6bfe7740e98&user_hash=pq1LFMUIO2jpv8fMQjP3VrVUQvn5SGho&gdpr=true.boom973.com/CHBMFM/nowplaying?_=1641093774440',
                    image: 'https://imgur.com/XSrw5Yf'
                });
                stations.set('chum', {
                    name: 'Chum 104.5',
                    link: 'http://24373.live.streamtheworld.com:3690/CHUMFMAAC_SC?DIST=TuneIn&TGT=TuneIn&maxServers=2&tdtok=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6ImZTeXA4In0.eyJpc3MiOiJ0aXNydiIsInN1YiI6IjIxMDY0IiwiaWF0IjoxNjQxMjQzODI5LCJ0ZC1yZWciOmZhbHNlfQ.Wa3yognhGCGxV_dxZUFEoJhOplLl_TaH9djjFO4pk2I&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY0MTI0MzgyOSwiaXNzIjoidGlzcnYifQ.TAvW6okHxs-vC4-bh0BPXXRoUHX5GVeJdPyItfUmdwI',
                    image: 'https://imgur.com/zU8nFmn'
                });

                    //Gets next station in the list
                    if (station == 'next') {
                        stationsArray = ['virginradio', '92.5', 'chfi', 'z103.5', 'q107', 'boom', 'chum'];
                        nowPlaying = fs.readFileSync('./defaultValues/currentStation.txt', "utf-8");
                        index = stationsArray.indexOf(nowPlaying);
                        if (index == stationsArray.length - 1) station = 'virginradio';
                        else station = stationsArray[index + 1];

                    }

                    //If station does not exists, return
                    if (!stations.has(station)) return message.channel.send('Station does not exist. Type -radio list');

                    //Deletes all current gifs/dials
                    imageIDs = fs.readFileSync('./defaultValues/imageIDs.txt', "utf-8");
                    ids = imageIDs.split('\n');
                    message.channel.messages.fetch(ids[1]).then(msg => msg.delete());
                    message.channel.messages.fetch(ids[2]).then(msg => msg.delete());
                    fs.writeFile('./defaultValues/imageIDs.txt', '', 'utf-8', function() {});
                

                    const link = stations.get(station).link;

                    //Default volume
                    vol = fs.readFileSync('./defaultValues/volume.txt', "utf-8");

                    const player = createAudioPlayer();

                    const resource = createAudioResource(link, {inlineVolume: true});

                    resource.volume.setVolume(vol);

                    client.user.setActivity(stations.get(station).name + ' 🔊', {type: 'PLAYING'});

                    const connection = joinVoiceChannel({
                        channelId: message.member.voice.channel.id,
                        guildId: message.guild.id,
                        selfDeaf: false,
                        adapterCreator: message.guild.voiceAdapterCreator
                    })

                    player.play(resource);
                    connection.subscribe(player);

                    //Sends speaker gif
                    message.channel.send('https://tenor.com/view/speaker-music-sound-gif-15246025')
                    //Saves the message id
                        .then(msg => fs.appendFile('./defaultValues/imageIDs.txt', '\n' + msg, function() {}));

                    //Sends new station dial
                    message.channel.send(stations.get(station).image)
                    //Saves the message id
                        .then(msg => fs.appendFile('./defaultValues/imageIDs.txt', '\n' + msg.id, function() {}));

                    //Writes station to current station file
                    fs.writeFile('./defaultValues/currentStation.txt', station, 'utf-8', function() {})

                    
            }
                    //Radio stations list
            else if (args[0] == 'list') {

                const newEmbed = new Discord.MessageEmbed()

                    .addFields({
                        name: 'Switch to the next station',
                        value: ' -radio next '
                    }, {
                        name: 'Virgin Radio',
                        value: ' -radio virginradio '
                    }, {
                        name: 'Kiss 92.5',
                        value: ' -radio 92.5 '
                    }, {
                        name: 'CHFI',
                        value: ' -radio chfi '
                    }, {
                        name: 'Z103.5',
                        value: ' -radio z103.5 '
                    }, {
                        name: 'Q107',
                        value: ' -radio q107 '
                    }, {
                        name: 'Boom 97.3',
                        value: ' -radio boom '
                    }, {
                        name: 'Chum 104.5',
                        value: ' -radio chum '
                    })

                    .setAuthor('Toronto Radio', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')
                    .setColor('#FF001C')
                    .setThumbnail('https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')
                    .setFooter('', 'https://i.pinimg.com/originals/dc/03/16/dc0316784f9c37d2a2b54766344739df.png')

                message.channel.send({embeds: [newEmbed]});

            }     
                
            }
        
        }