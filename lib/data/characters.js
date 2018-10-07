const STR = "Strength";
const INT = "Intelligence";
const WIS = "Wisdom";
const DEX = "Dexterity";
const CON = "Constitution";
const CHA = "Charisma";

const data = [
  {
    name: "Cleric",
    prime: [WIS]
  },
  {
    name: "Fighter",
    prime: [STR]
  },
  {
    name: "Magic-User",
    prime: [INT]
  },
  {
    name: "Thief",
    prime: [DEX]
  },
  {
    name: "Dwarf",
    prime: [STR],
    min: [[CON, 9]]
  },
  {
    name: "Elf",
    prime: [STR, INT],
    min: [[INT, 9]]
  },
  {
    name: "Halfling",
    prime: [STR, DEX],
    min: [[DEX, 9], [CON, 9]]
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
