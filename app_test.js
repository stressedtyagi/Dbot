const WebSocket = require("ws");

const ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
const token = "NTEwODg2MTc1NDI3NTI2NjYx.YaJWfQ.v4deRA3veRodOYpyuRiCN11me_M";
let interval = 0;
const payload = {
    op: 2,
    d: {
        token: token,
        intents: 513,
        properties: {
            $os: "linux",
            $browser: "chrome",
            $device: "chrome",
        },
    },
};

ws.on("open", function open() {
    console.log(payload);
    ws.send(JSON.stringify(payload));
});

// ws.on("typing", function (data) {
//     console.log(data);
// });

ws.on("message", function incoming(data) {
    let { t, event, op, d } = JSON.parse(data);
    switch (op) {
        case 10:
            const { heartbeat_interval } = d;
            console.log(heartbeat_interval);
            interval = heartbeat(heartbeat_interval);
            break;
    }
    switch (t) {
        case "MESSAGE_CREATE":
            let author = d.author.username;
            let content = d.content;
            console.log(`${author} : ${content}`);
    }
});

const heartbeat = (ms) => {
    return setInterval(() => {
        ws.send(JSON.stringify({ op: 2, d: null }));
    }, ms);
};

/* USING WEB HOOKS TESTING */
// const { Client, Intents, MessageEmbed } = require("discord.js");
// const { token } = require("./config.json");

// const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// const embed = new MessageEmbed().setTitle("Some Title").setColor("#0099ff");

// console.log(client + " " + embed);

// client.once("ready", async () => {
//     const channel = client.channels.get("921448845542576229");
//     try {
//         const webhooks = await channel.fetchWebhooks();
//         const webhook = webhooks.find((wh) => wh.token);

//         if (!webhook) {
//             return console.log("No webhook was found that I can use!");
//         }
//     } catch (error) {
//         console.error("Error trying to send: ", error);
//     }
// });

// client.login(token);
