const Discord = require("discord.js");
const { Intents } = require("discord.js");
const botconfig = require("./botconfig.json");
const intents = new Discord.Intents(32767)
const bot = new Discord.Client({intents : 
    [Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES, 
    Discord.Intents.FLAGS.GUILD_VOICE_STATES, 
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING]});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
///////////////////////// MUSIC /////////////////////////

const { Player } = require('discord-player');
const { readdirSync } = require('fs');
bot.config = require('./config');
bot.player = new Player(bot, bot.config.opt.discordPlayer);
const player = bot.player

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of events) {
    const event = require(`./events/${file}`);
    console.log(`-> Loaded event ${file.split('.')[0]}`);
    bot.on(file.split('.')[0], event.bind(null, bot));
    delete require.cache[require.resolve(`./events/${file}`)];
};

///////////////////////// MUSIC /////////////////////////






["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot)
});

bot.on("message", async message => {
    let prefix = botconfig.prefix;
    let fejleszto = botconfig.author;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase();
    if(cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));

    if(command)
    command.run(bot, message, args);
});

//////////////////////////////////////////////////////

//////////////////////////////////////////////////////

/////////////////////////////////////////////////////


let botname = "Ani - Bot"









/////////////////|| READY ||/////////////////

bot.on("ready", async() => {

    

    console.log(`${bot.user.username} Elindult.!`)
    console.log(`Prefix: //`)

    let statuszok = [
        `????| Prefix : //`,
        `????| Fejleszt??: Dennyel#1085`,
		`????| Hali. Nekem ${bot.users.cache.size} bar??tom van.`
    ]

    setInterval(function(){
        let status = statuszok[Math.floor(Math.random()* statuszok.length)]

        bot.user.setActivity(status, {type: "PLAYING"})
    }, 3000)
})





player.on('trackStart', (queue, track) => {
  if (!bot.config.opt.loopMessage && queue.repeatMode !== 0) return;
  queue.metadata.send({ content: `>>> <:playicon:1006813116224507915> **A zene elind??tva:** __${track.title}__ ??? **Csatorna:** __${queue.connection.channel.name}__` });
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send({ content: `>>> **Hozz??adva a lej??tsz??si list??hoz.** __${track.title}__ <:accepted_correct:982724889087729674>` });
});

player.on('botDisconnect', (queue) => {
  queue.metadata.send({ content: `>>> Valaki az audio csatorn??r??l, amelyhez csatlakoztam, kir??gott, az eg??sz lej??tsz??si lista t??rl??d??tt! <:CircleTicketNo:982724901184086056>` });
});

player.on('channelEmpty', (queue) => {
  queue.metadata.send({ content: `>>> Az??rt hagytam el az audiocsatorn??t, mert nincs senki az hang csatorn??mon. <:CircleTicketNo:982724901184086056>` });
});

player.on('queueEnd', (queue) => {
  queue.metadata.send({ content: `>>> Az ??sszes zen??t meghallgatuk. <:accepted_correct:982724889087729674>` });
});






bot.on("guildCreate", (guild) => {
    if (!guild.partial) {
      const channel = bot.channels.cache.get("1037437892315848735");
      if (channel) {
        const botjoinlogembed = new Discord.MessageEmbed()
          .setTitle(`??j helyre h??vtak meg. <:9376_tsuwelcome:982724886369804359>`)
          .setColor("GREEN")
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .addField("Szerver Neve", `**${guild.name}**`, true)
          .addField("Szerver ID", `**${guild.id}**`, true)
          .addField("Szerver Tulajdonos", `**${guild.ownerId.tag}**`, true)
          .setDescription(`**A szerveren van ${guild.memberCount} felhaszn??l??**`)
          .setTimestamp();
        channel.send({ embeds: [botjoinlogembed] });
      }
    }
  });


  bot.on("guildDelete", (guild) => {
    if (!guild.partial) {
      const channel = bot.channels.cache.get("1037437892315848735");
      if (channel) {
        const botleftlogembed = new Discord.MessageEmbed()
          .setTitle(`<:sadge:982724935711588452> Kidobtak a szerverr??l. `)
          .setColor("RED")
          .setThumbnail(guild.iconURL({ dynamic: true }))
          .addField("Sserver Neve", `**${guild.name}**`, true)
          .addField("Szerver ID", `**${guild.id}**`, true)
          .addField("Szerver Tulajdonos", `**${guild.ownerId.tag}**`, true)
          .setTimestamp();
        channel.send({ embeds: [botleftlogembed] });
      }
    }
  });

/////////////////|| READY - ||/////////////////
















bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    
    let cmd = MessageArray[0];
    let cmd1 = MessageArray[1];
    let cmd2 = MessageArray[2];
    let cmd3 = MessageArray[3];
    let cmd4 = MessageArray[4];
    let cmd5 = MessageArray[5];

    let args = MessageArray.slice(1);

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;



    console.log(cmd,cmd1,cmd2,cmd3,cmd4,cmd5);
})

/////////////////|| Welcome leave ||/////////////////


bot.on('guildMemberAdd', member =>{
    //This is the welcome code
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome"); //You can change welcome to any text channel you want, "general", "new-doods", ect.
    if(!channel) return;

    channel.send(`<:joins:982724911103623239> **Szia ${member}, K??szi hogy csatlakozt??l!**`)
});

//////////////////////

bot.on('guildMemberRemove', member =>{
    //This is the leave code
    const channel = member.guild.channels.cache.find(channel => channel.name === "leave"); //You can change welcome to any text channel you want, "general", "new-doods", ect.
    if(!channel) return;

    channel.send(`<:lea:982724913620193341> ${member} **Sajnos elhagyta a szervert!**`)
});

/////////////////|| Welcome leave - ||/////////////////



/////////////////|| IMAGE Welcome leave ||////////////////




// bot.on("guildMemberAdd", async member => {
//     const Joinchannel = member.guild.channels.cache.find(channel => channel.name === "welcome");
//     const welcomeCard = new canvacord.Welcomer()
//     .setUsername(member.user.username)
//     .setDiscriminator(member.user.discriminator)
//     .setColor("title", "#FEFCFC") //white
//     .setAvatar(member.user.displayAvatarURL({ format: "png" }))
//     .setColor("username-box", "#FEFCFC") //white
//     .setColor("discriminator-box", "#FEFCFC") //white
//     .setColor("message-box", "#FEFCFC") //white
//     .setColor("border", "#000000") //black
//     .setColor("avatar", "#FEFCFC") //white
//     .setBackground("https://cdn.discordapp.com/attachments/927593641936035860/927941113959055430/wallpaper_1280x720.png") //should be png format
//     .setMemberCount(member.guild.memberCount)
//     let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "welcome.png")
//     Joinchannel.send(attachment);
//   })

//   bot.on("guildMemberRemove", async member => {
//     const Joinchannel = member.guild.channels.cache.find(channel => channel.name === "leave");
//     const welcomeCard = new canvacord.Leaver()
//     .setUsername(member.user.username)
//     .setDiscriminator(member.user.discriminator)
//     .setAvatar(member.user.displayAvatarURL({ format: "png" }))
//     .setColor("title", "#FEFCFC") //white
//     .setColor("username-box", "#FEFCFC") //white
//     .setColor("discriminator-box", "#FEFCFC") //white
//     .setColor("message-box", "#FEFCFC") //white
//     .setColor("border", "#000000") //black
//     .setColor("avatar", "#FEFCFC") //white
 //    .setBackground("https://cdn.discordapp.com/attachments/927593641936035860/927941113959055430/wallpaper_1280x720.png") //should be png format
//     .setMemberCount(member.guild.memberCount)
//     let attachment = new Discord.MessageAttachment(await welcomeCard.build(), "by.png")
//     Joinchannel.send(attachment);
//   })

/////////////////|| IMAGE Welcome leave - ||/////////////////


bot.login(botconfig.TOKEN);
