const axios = require("axios");

async function checkVIP(userId) {

    try {
        const res = await axios.get(`http://localhost:3001/vip/${userId}`);
        return res.data;
    } catch {
        return { vip: "none" };
    }
}

module.exports = { checkVIP };
