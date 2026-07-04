const cooldowns = new Map();

function checkSpam(userId, action, limit = 3000) {

    const key = `${userId}-${action}`;
    const now = Date.now();

    if (cooldowns.has(key)) {
        const last = cooldowns.get(key);

        if (now - last < limit) {
            return false;
        }
    }

    cooldowns.set(key, now);
    return true;
}

module.exports = { checkSpam };
