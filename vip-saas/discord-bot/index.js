const fs = require("fs");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// 📦 load commands
const commands = new Map();
const files = fs.readdirSync("./commands");

for (const file of files) {
    const cmd = require(`./commands/${file}`);
    commands.set(cmd.name, cmd);
}

client.on("messageCreate", async (msg) => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith("!")) return;

    const args = msg.content.slice(1).split(" ");
    const cmdName = args[0];

    const cmd = commands.get(cmdName);

    if (cmd) cmd.run(msg, args);
});

client.once("ready", () => {
    console.log(`🤖 Bot online: ${client.user.tag}`);
});

client.login(process.env.TOKEN);
