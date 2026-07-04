const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const { db, addCoins } = require("./database.js");
const config = require("./config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let dailyActive = false;
let dailyMessage = null;

client.once("ready", async () => {
    console.log("Bot ONLINE");

    setInterval(async () => {
        const now = Date.now();

        db.get("SELECT lastClaim FROM daily WHERE id = 1", async (err, row) => {

            if (!row || now - row.lastClaim > 24 * 60 * 60 * 1000) {

                dailyActive = true;

                const channel = await client.channels.fetch(config.logChannelId);

                const embed = new EmbedBuilder()
                    .setTitle("🎫 DAILY TICKET")
                    .setDescription("🔥 Pirmais, kas nospiež, saņem BALVU!")
                    .setColor("Gold");

                const rowBtn = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("daily_ticket")
                        .setLabel("🎁 PIEPRASĪT")
                        .setStyle(ButtonStyle.Success)
                );

                dailyMessage = await channel.send({
                    embeds: [embed],
                    components: [rowBtn]
                });

                if (row) {
                    db.run("UPDATE daily SET lastClaim = ? WHERE id = 1", [now]);
                } else {
                    db.run("INSERT INTO daily (id, lastClaim) VALUES (1, ?)", [now]);
                }
            }
        });

    }, 60 * 1000); // pārbauda katru minūti
});

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    // 🎫 DAILY TICKET
    if (interaction.customId === "daily_ticket") {

        if (!dailyActive) {
            return interaction.reply({
                content: "❌ Šodien jau paņemts!",
                ephemeral: true
            });
        }

        dailyActive = false;

        const reward = Math.floor(Math.random() * 50000) + 10000;

        addCoins(interaction.user.id, reward);

        await interaction.reply({
            content: `🏆 ${interaction.user} uzvarēja DAILY TICKET un saņēma 💰 **${reward} coins!**`
        });

        if (dailyMessage) {
            const disabledRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("daily_ticket")
                    .setLabel("❌ PAŅEMTS")
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

            dailyMessage.edit({ components: [disabledRow] });
        }
    }

    // 🎨 VIP DESIGN (vienkāršots)
    if (interaction.customId === "red") {
        addCoins(interaction.user.id, -10000);

        return interaction.reply({
            content: "🔴 Fire Red piešķirts!"
        });
    }

    if (interaction.customId === "blue") {
        addCoins(interaction.user.id, -10000);

        return interaction.reply({
            content: "🔵 Ocean Blue piešķirts!"
        });
    }

    if (interaction.customId === "random") {
        const list = ["🔴 Red", "🔵 Blue", "🟣 Purple"];
        const pick = list[Math.floor(Math.random() * list.length)];

        return interaction.reply({
            content: `🎲 Random: **${pick}**`
        });
    }
});

client.login(config.token);
