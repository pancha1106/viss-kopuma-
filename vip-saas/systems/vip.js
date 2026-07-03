const { getUser } = require("./economy");

function setVIP(id, tier) {
    const u = getUser(id);
    u.vip = tier;
}

function getVIP(id) {
    return getUser(id).vip;
}

module.exports = { setVIP, getVIP };
