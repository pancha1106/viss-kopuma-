const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    name: "mysterybox",

    async execute(client, message) {

        const embed = new EmbedBuilder()
            .setTitle("🎁 MYSTERY BOX")
            .setDescription(
                "Pirmais, kurš nospiedīs pogu, saņems nejaušu balvu!"
            )
            .setColor("Gold");

        const button = new ButtonBuilder()
            .setCustomId("mystery_box")
            .setLabel("🎁 Atvērt Mystery Box")
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(button);

        const msg = await message.channel.send({
            embeds: [embed],
            components: [row]
        });

        const collector = msg.createMessageComponentCollector({
            time: 60000
        });

        let claimed = false;

        collector.on("collect", async interaction => {

            if (claimed) {
                return interaction.reply({
                    content: "❌ Mystery Box jau ir paņemts!",
                    ephemeral: true
                });
            }

            claimed = true;

            const rewards = [
                "💎 100 Dimanti",
                "🪙 50,000 Coins",
                "🎫 5 Biļetes",
                "💎 500 Dimanti",
                "🪙 100,000 Coins",
                "🎫 10 Biļetes"
            ];

            const reward = rewards[Math.floor(Math.random() * rewards.length)];

            await interaction.reply({
                content: `🎉 Apsveicam ${interaction.user}!\nTu laimēji **${reward}**!`
            });

            button.setDisabled(true);

            await msg.edit({
                components: [new ActionRowBuilder().addComponents(button)]
            });

            collector.stop();
        });

    }
};
