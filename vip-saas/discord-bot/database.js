const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data.sqlite");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            coins INTEGER DEFAULT 0
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS daily (
            id INTEGER PRIMARY KEY,
            lastClaim INTEGER
        )
    `);
});

function getUser(id, cb) {
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (!row) {
            db.run("INSERT INTO users (id, coins) VALUES (?, ?)", [id, 0]);
            cb({ id, coins: 0 });
        } else cb(row);
    });
}

function addCoins(id, amount) {
    db.run("UPDATE users SET coins = coins + ? WHERE id = ?", [amount, id]);
}

module.exports = { db, getUser, addCoins };
