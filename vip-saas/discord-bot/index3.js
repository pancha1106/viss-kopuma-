const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

// 📦 load commands
const commandFiles = fs.readdirSync("./commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// 💬 message commands
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    const args = message.content.split(" ");
    const cmd = args.shift().toLowerCase();

    if (client.commands.has(cmd)) {
        client.commands.get(cmd).execute(message, args, client);
    }
});

require("./events/interactionCreate")(client);

client.once("ready", () => {
    console.log(`Bot ONLINE: ${client.user.tag}`);
});

client.login(config.token);
