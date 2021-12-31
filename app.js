require("dotenv").config();
const { Client, Intents } = require("discord.js");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
    if (message.author.bot) return;
    message.reply(
        `USER : ${message.author.username} \nMESSAGE : ${message.content}`
    );
});

client.login(process.env.TOKEN);
