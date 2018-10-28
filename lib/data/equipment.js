const startingMoney = '3d6 x 10';

const armor = [
  { id: 0, name: 'Leather Armor', ac: 7, cost: 20 },
  { id: 1, name: 'Maille Armor', ac: 5, cost: 40 },
  { id: 2, name: 'Plate Armor', ac: 3, cost: 60 },
  { id: 3, name: 'Shield', ac: 1, cost: 10, notes: 'Shields subtract one from your AC.' }
];

const weapons = [
  { id: 0, name: 'Battle Axe', damage: '1d8', cost: 7, notes: 'Two Handed'},
  { id: 1, name: 'Hand Axe', damage: '1d6', cost: 4},
  { id: 2, name: 'Light Crossbow', damage: '1d6', cost: 30, 'Fires quarrels'},
  { id: 3, name: 'Long Bow', damage: '1d6', cost: 40},
  { id: 4, name: 'Short Bow', damage: '1d6', cost: 25},
  { id: 5, name: 'Dagger', damage: '1d4', cost: 3},
  { id: 6, name: 'Silver Dagger', damage: '1d4', cost: 30},
  { id: 7, name: 'Short Sword', damage: '1d6', cost: 7},
  { id: 8, name: 'Normal Sword', damage: '1d8', cost: 10},
  { id: 9, name: 'Two-Handed Sword', damage: '1d10', cost: 15, notes: 'Two Handed'},
  { id: 10, name: 'Mace', damage: '1d6', cost: 5},
  { id: 11, name: 'Club', damage: '1d4', cost: 3},
  { id: 12, name: 'Pole Arm', damage: '1d10', cost: 7, notes: 'Two Handed'},
  { id: 13, name: 'Sling', damage: '1d4', cost: 2, notes: 'Includes 30 Stones'},
  { id: 14, name: 'Spear', damage: '1d6', cost: 3},
  { id: 15, name: 'War Hammer', damage: '1d6', cost: 5}
];

const equipment = [
  { id: 0, name: 'Backpack', cost: 5 },
  { id: 2, name: 'Flask of Oil', cost: 2 },
  { id: 3, name: 'Holy Symbol', cost: 25 },
  { id: 4, name: 'Holy Water (1 vial)', cost: 25 },
  { id: 5, name: 'Lantern', cost: 10 },
  { id: 6, name: 'Mirror (hand-sized steel)', cost: 5 },
  { id: 7, name: 'Pole (wood, 10\' long)', cost: 1 },
  { id: 8, name: 'Iron Rations (1 week)', cost: 15 },
  { id: 9, name: 'Rations (1 week)', cost: 5 },
  { id: 10, name: 'Rope (50\')', cost: 1 },
  { id: 11, name: 'Small Sack', cost: 1 },
  { id: 12, name: 'Large Sack', cost: 2 },
  { id: 13, name: 'Spikes (iron 12) and small hammer', cost: 3 },
  { id: 14, name: 'Thieve\'s Tools', cost: 25 },
  { id: 15, name: 'Tinder Box', cost: 3 },
  { id: 16, name: 'Torches (6)', cost: 1 },
  { id: 17, name: 'Waterskin', cost: 1 },
  { id: 18, name: 'Wine (1 quart)', cost: 1 },
  { id: 19, name: 'Wolfsbane (1 bunch)', cost: 10},
  { id: 20, name: 'Case of Quarrels (30)', cost: 10 },
  { id: 21, name: 'Quiver of Arrows (20)', cost: 5 },
  { id: 22, name: 'Arrow 1 Silver Tipped', cost: 5 }
];

module.exports = {
  startingMoney,
  armor,
  weapons,
  equipment
};
