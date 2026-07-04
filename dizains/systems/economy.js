function work(user) {
  const earn = Math.floor(Math.random() * 100) + 50;
  user.coins += earn;

  user.xp += 20;
  if (user.xp >= user.level * 100) {
    user.level++;
    user.xp = 0;
  }

  return earn;
}

module.exports = { work };
