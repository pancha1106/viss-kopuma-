const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { addCoins, addDiamonds, db } = require("../database.js");

let dailyActive = false;

module.exports = (client) => {

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    // 🎨 DESIGN
    if (interaction.customId === "red") {
        addCoins(interaction.user.id, -10000);
        return interaction.reply({ content: "🔴 Red piešķirts", ephemeral: true });
    }

    if (interaction.customId === "blue") {
        addCoins(interaction.user.id, -10000);
        return interaction.reply({ content: "🔵 Blue piešķirts", ephemeral: true });
    }

    // 💎 PRIVATE CHANNEL
    if (interaction.customId === "channel") {

        const channel = await interaction.guild.channels.create({
            name: `vip-${interaction.user.username}`,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: ["ViewChannel"] },
                { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] }
            ]
        });

        return interaction.reply({
            content: `💎 Kanāls izveidots: ${channel}`,
            ephemeral: true
        });
    }

    // 🎫 DAILY TICKET
    if (interaction.customId === "daily_ticket") {

        if (!dailyActive) {
            return interaction.reply({ content: "❌ jau paņemts", ephemeral: true });
        }

        dailyActive = false;

        const reward = Math.floor(Math.random() * 50000) + 10000;

        addCoins(interaction.user.id, reward);

        return interaction.reply({
            content: `🏆 Tu laimēji ${reward} coins!`
        });
    }
});

};
