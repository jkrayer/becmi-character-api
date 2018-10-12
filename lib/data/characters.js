const STR = "Strength";
const INT = "Intelligence";
const WIS = "Wisdom";
const DEX = "Dexterity";
const CON = "Constitution";
const CHA = "Charisma";

const hitRollTable = [[9,10], [8,11], [7,12], [6,13], [5,14], [4,15], [3,16], [2,17], [1,18], [0,19], [-1,20]];

const data = [
  {
    name: "Cleric",
    title: "Acolyte",
    hitDie: 6,
    armor: "A cleric may wear any kind of armor, and may use a shield.",
    weapons: "A cleric may only use a mace, club, war hammer, or sling.",
    prime: [WIS],
    savingThrows: {
      deathRayOrPoison: 11,
      magicWand: 12,
      paralysisOrTurnToStone: 14,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    specialAbilities: "A cleric has two Special Abilities: Turning Undead monsters and casting Cleric Spells (beginning at second level).",
    hitRollTable,
  },
  {
    name: "Fighter",
    title: "Veteran",
    hitDie: 8,
    armor: "A fighter may wear any kind of armor, and may use a shield.",
    weapons: "A fighter may use any kind of weapon.",
    prime: [STR],
    savingThrows: {
      deathRayOrPoison: 12,
      magicWand: 13,
      paralysisOrTurnToStone: 14,
      dragonBreath: 15,
      rodsStavesOrSpells: 16
    },
    specialAbilities: "Fighters need no special abilities to survive and prosper. Their great strength, hit points, strong armor and many weapons make them a powerful character class.",
    hitRollTable
  },
  {
    name: "Magic-User",
    title: "Medium",
    hitDie: 4,
    armor: "A magic-user may not wear any kind of armor, and may not use a shield.",
    weapons: "A magic-user can only use a dagger for a weapon.",
    prime: [INT],
    savingThrows: {
      deathRayOrPoison: 13,
      magicWand: 14,
      paralysisOrTurnToStone: 13,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    specialAbilities: "A magic-user can cast magic spells. First level magic-users start with Read Magic and either Magic Missle or Sleep.",
    hitRollTable
  },
  {
    name: "Thief",
    title: "Apprentice",
    hitDie: 4,
    armor: "A thief may only wear Leather armor, and may not use a shield.",
    weapons: "A thief may use any missile weapon, and any other weapon usable with one hand (two-handed weapons are prohibited.",
    prime: [DEX],
    savingThrows: {
      deathRayOrPoison: 13,
      magicWand: 14,
      paralysisOrTurnToStone: 13,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    specialAbilities: "Thieves know how to Open Locks, Find and Remove Traps, Climb Walls, Move Silently, Hide in Shadows, Pick Pockets, and Hear Noise. They also learn the skill of &lsquo;Backstabbing.&rsquo;",
    hitRollTable
  },
  {
    name: "Dwarf",
    title: "Dwarven Veteran",
    hitDie: 8,
    armor: "A dwarf may wear any kind of armor, and may use a shield.",
    weapons: "A dwarf may use any weapon of small or normal size. Dwarves may not use two-handed swords or longbows.",
    prime: [STR],
    min: [[CON, 9]],
    savingThrows: {
      deathRayOrPoison: 8,
      magicWand: 9,
      paralysisOrTurnToStone: 10,
      dragonBreath: 13,
      rodsStavesOrSpells: 12
    },
    specialAbilities: "A dwarf has special vision, knows several languages, and can detect certain things better than other characters.",
    hitRollTable
  },
  {
    name: "Elf",
    title: "Veteran-Medium",
    hitDie: 6,
    armor: "An elf may wear any kind of armor, and may use a shield.",
    weapons: "An elf may use any weapon.",
    prime: [STR, INT],
    min: [[INT, 9]],
    savingThrows: {
      deathRayOrPoison: 12,
      magicWand: 13,
      paralysisOrTurnToStone: 13,
      dragonBreath: 15,
      rodsStavesOrSpells: 15
    },
    specialAbilities: "An elf has special vision, knows several languages, and can detect certain things better than other characters. Elves can cast magic-user spells, and cannot be paralyzed by ghouls.",
    hitRollTable
  },
  {
    name: "Halfling",
    title: "Halfling Veteran",
    hitDie: 6,
    armor: "A halfling may wear any kind of armor, and may use a shield. However, their armor and shields must be specially made for their small size. Even dwarfsized armor is too large for them.",
    weapons: "A halfling may use any small sized weapon (such as a dagger, short sword, or short bow). Halflings may not use two-handed swords, longbows, battle axes, pole arms, or other large weapons.",
    prime: [STR, DEX],
    min: [[DEX, 9], [CON, 9]],
    savingThrows: {
      deathRayOrPoison: 8,
      magicWand: 9,
      paralysisOrTurnToStone: 10,
      dragonBreath: 13,
      rodsStavesOrSpells: 12
    },
    specialAbilities: "A halfling gains several combat bonuses (some due to their small size) and can hide easily in woodlands.",
    hitRollTable
  }
];

module.exports = {
  STR,
  INT,
  WIS,
  DEX,
  CON,
  CHA,
  data
}
