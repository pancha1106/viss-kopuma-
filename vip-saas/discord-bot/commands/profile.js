const { getUser } = require("../systems/economy");
const { checkVIP } = require("../systems/vipCheck");

module.exports = {
    name: "profile",
    run: async (msg) => {

        const u = getUser(msg.author.id);
        const vip = await checkVIP(msg.author.id);

        msg.channel.send(`
👤 PROFILE

🪙 Coins: ${u.coins}
💎 Diamonds: ${u.diamonds}
👑 VIP (game): ${u.vip}
💳 VIP (paid): ${vip.tier || "none"}
⏳ Expiry: ${vip.expires ? new Date(vip.expires).toLocaleString() : "-"}
        `);
    }
};
