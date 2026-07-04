const loot = [
  { item: "red", chance: 40 },
  { item: "glow", chance: 25 },
  { item: "gold_frame", chance: 15 },
  { item: "diamond_frame", chance: 10 },
  { item: "vip", chance: 5 }
];

function roll() {
  let r = Math.random() * 100;
  let sum = 0;

  for (let l of loot) {
    sum += l.chance;
    if (r <= sum) return l.item;
  }

  return "red";
}

module.exports = { roll };
