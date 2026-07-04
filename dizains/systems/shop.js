const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function shop() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId("buy_glow").setLabel("Glow").setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId("buy_frame").setLabel("Frame").setStyle(ButtonStyle.Success),
    new ButtonBuilder().setCustomId("buy_vip").setLabel("VIP").setStyle(ButtonStyle.Danger)
  );
}

module.exports = { shop };
