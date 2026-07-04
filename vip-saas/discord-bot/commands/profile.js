const { getUser } = require("../database.js");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "!profile",

    execute(message) {

        const user = message.mentions.users.first() || message.author;

        getUser(user.id, (data) => {

            const embed = new EmbedBuilder()
                .setTitle(`👤 Profils - ${user.username}`)
                .setThumbnail(user.displayAvatarURL())
                .setColor("Blue")
                .addFields(
                    { name: "💰 Coins", value: `${data.coins}`, inline: true },
                    { name: "💎 Diamonds", value: `${data.diamonds}`, inline: true }
                );

            message.channel.send({ embeds: [embed] });
        });
    }
};
