 const { getUser } = require("../systems/economy");

const ADMINS = ["YOUR_DISCORD_ID"];

module.exports = {
    name: "admin",
    run: async (msg, args) => {

        if (!ADMINS.includes(msg.author.id))
            return msg.reply("❌ nav admin");

        const action = args[1];

        // GIVE COINS
        if (action === "coins") {
            const user = await getUser(msg.mentions.users.first().id);
            const amount = parseInt(args[3]);

            user.coins += amount;
            await user.save();

            return msg.reply("✔ coins added");
        }

        // GIVE VIP
        if (action === "vip") {
            const user = await getUser(msg.mentions.users.first().id);
            user.vip = args[3];
            await user.save();

            return msg.reply("✔ VIP given");
        }
    }
};
