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
    description: "",
    savingThrows: {
      deathRayOrPoison: 11,
      magicWand: 12,
      paralysisOrTurnToStone: 14,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    title: "Acolyte",
    xpForNextLevel: 1500,
    prime: [WIS],
    hitDie: 6,
    armor: {
      description: "A cleric may wear any kind of armor, and may use a shield."
    },
    weapons: {
      description: "A cleric may only use a mace, club, war hammer, or sling.",
      ids: [10, 11, 13, 15]
    },
    specialAbilities: {
      description: "A cleric has two Special Abilities: Turning Undead monsters and casting Cleric Spells (beginning at second level).",
      abilities: [
        {
          title: "Turn Undead",
          description: "Roll 2d6 to attempt to turn an undead monster of a given type. If you are successful your DM will secretly roll 2d6 to determine how many hit dice of monsters are affected.",
          table: [
            ['Level', 1, 2, 3],
            ['Skeleton', 7, 'T', 'T'],
            ['Zombie', 9, 7, 'T'],
            ['Ghoul', 11, 9, 7],
            ['Wight', 'N', 11, 9]
          ]
        },
        {
          title: "Spells",
          description: "..."
        }
      ]
    },
    hitRollTable,
  },
  {
    name: "Fighter",
    description: "",
    savingThrows: {
      deathRayOrPoison: 12,
      magicWand: 13,
      paralysisOrTurnToStone: 14,
      dragonBreath: 15,
      rodsStavesOrSpells: 16
    },
    title: "Veteran",
    xpForNextLevel: 2000,
    prime: [STR],
    hitDie: 8,
    armor: {
      description: "A fighter may wear any kind of armor, and may use a shield."
    },
    weapons: {
      description: "A fighter may use any kind of weapon."
    },
    specialAbilities: {
      description: "Fighters need no special abilities to survive and prosper. Their great strength, hit points, strong armor and many weapons make them a powerful character class.",
      abilities: []
    },
    hitRollTable
  },
  {
    name: "Magic-User",
    description: "",
    savingThrows: {
      deathRayOrPoison: 13,
      magicWand: 14,
      paralysisOrTurnToStone: 13,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    title: "Medium",
    xpForNextLevel: 2500,
    prime: [INT],
    hitDie: 4,
    armor: {
      description: "A magic-user may not wear any kind of armor, and may not use a shield.",
      ids: -1
    },
    weapons: {
      description: "A magic-user can only use a dagger for a weapon.",
      ids: [5, 6]
    },
    specialAbilities: {
      description: "A magic-user can cast magic spells. First level magic-users start with Read Magic and either Magic Missle or Sleep.",
      abilities: []
    },
    hitRollTable
  },
  {
    name: "Thief",
    description: "",
    savingThrows: {
      deathRayOrPoison: 13,
      magicWand: 14,
      paralysisOrTurnToStone: 13,
      dragonBreath: 16,
      rodsStavesOrSpells: 15
    },
    title: "Apprentice",
    xpForNextLevel: 1200,
    prime: [DEX],
    hitDie: 4,
    armor: {
      description: "A thief may only wear Leather armor, and may not use a shield.",
      ids: [0]
    },
    weapons: {
      description: "A thief may use any missile weapon, and any other weapon usable with one hand (two-handed weapons are prohibited.",
      ids: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15]
    },
    specialAbilities: {
      description: "Thieves know how to Open Locks, Find and Remove Traps, Climb Walls, Move Silently, Hide in Shadows, Pick Pockets, and Hear Noise. They also learn the skill of &lsquo;Backstabbing.&rsquo;",
      abilities: [
        {
          title: "",
          description: "",
          table: [
            ['Ability', 'Open Locks', 'Find Traps', 'Remove Traps', 'Climb Walls', 'Move Silently', 'Hide in Shadows', 'Pick Pockets', 'Hear Noise'],
            [1, 15, 10, 10, 87, 20, 10, 20, '1-2'],
            [2, 20, 15, 15, 88, 25, 15, 25, '1-2'],
            [3, 25, 20, 20, 89, 30, 20, 30, '1-3']
          ]
        },
        {
          title: "Backstab",
          description: "If a thief can sneak up on a victim, completely unnoticed, the thief may Backstab. The thief gains a bonus of +4 on the Hit Roll, and if the target is hit, the damage done is twice normal."
        }
      ]
    },
    hitRollTable
  },
  {
    name: "Dwarf",
    description: "",
    savingThrows: {
      deathRayOrPoison: 8,
      magicWand: 9,
      paralysisOrTurnToStone: 10,
      dragonBreath: 13,
      rodsStavesOrSpells: 12
    },
    title: "Dwarven Veteran",
    xpForNextLevel: 2200,
    prime: [STR],
    min: [[CON, 9]],
    hitDie: 8,
    armor: {
      description: "A dwarf may wear any kind of armor, and may use a shield."
    },
    weapons: {
      description: "A dwarf may use any weapon of small or normal size. Dwarves may not use two-handed swords or longbows.",
      ids: [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    },
    specialAbilities: {
      description: "A dwarf has special vision, knows several languages, and can detect certain things better than other characters.",
      abilities: [
        {
          title: "Infravision",
          description: "Dwarves have Infravision in addition to normal sight and can see 60‘ in the dark. Infravision is the ability to see heat (and the lack of heat). Normal and magical light makes infravision useless."
        },
        {
          title: "Language",
          description: "In addition to the Common and Alignment tongues a dwarf can speak dwarf, gnome, goblin, and kobold."
        },
        {
          title: "Detection",
          description: "All dwarves are experts at mining. They can sometimes detect traps, sliding walls, sloping corridors, and new constructions. If your dwarf character wants to search for such things in an area, tell your Dungeon Master. Your DM will roll ld6, and a result of 1 or 2 will indicate success. You may check once for each type; the detection is never automatic"
        }
      ]
    },
    hitRollTable
  },
  {
    name: "Elf",
    description: "",
    savingThrows: {
      deathRayOrPoison: 12,
      magicWand: 13,
      paralysisOrTurnToStone: 13,
      dragonBreath: 15,
      rodsStavesOrSpells: 15
    },
    title: "Veteran-Medium",
    prime: [STR, INT],
    min: [[INT, 9]],
    hitDie: 6,
    armor: {
      description: "An elf may wear any kind of armor, and may use a shield."
    },
    weapons: {
      description: "An elf may use any weapon."
    },
    specialAbilities: {
      description: "An elf has special vision, knows several languages, and can detect certain things better than other characters. Elves can cast magic-user spells, and cannot be paralyzed by ghouls.",
      abilities: [
        {
          title: "Vision",
          description: "Elves have Infravision in addition to normal sight and can see 60’ in the dark. Infravision is the ability to see heat (and the lack of heat). Normal and magical light makes infravision useless."
        },
        {
          title: "Language",
          description: "In addition to Common and Alignment tongues an elf can speak elf, gnoll, hobgoblin, and orc."
        },
        {
          title: "Detection",
          description: "All elves can find secret and hidden doors better than other characters. You fins secret doors on a roll of 1 or 2 on a d6."
        },
        {
          title: "Immunity to Ghoul Paralysis",
          description: "All elves are naturally immune to the paralyzing attacks of ghouls. Other types of paralysis, such as from a carrion crawler or gelatinous cube, may affect them."
        },
        {
          title: "Spells",
          description: "Elves can use magic-user spells just as magic-users can. Elves must obey all the rules for using magic-user spells."
        }
      ]
    },
    hitRollTable
  },
  {
    name: "Halfling",
    description: "",
    savingThrows: {
      deathRayOrPoison: 8,
      magicWand: 9,
      paralysisOrTurnToStone: 10,
      dragonBreath: 13,
      rodsStavesOrSpells: 12
    },
    title: "Halfling Veteran",
    prime: [STR, DEX],
    min: [[DEX, 9], [CON, 9]],
    hitDie: 6,
    armor: {
      description: "A halfling may wear any kind of armor, and may use a shield. However, their armor and shields must be specially made for their small size. Even dwarfsized armor is too large for them."
    },
    weapons: {
      description: "A halfling may use any small sized weapon (such as a dagger, short sword, or short bow). Halflings may not use two-handed swords, longbows, battle axes, pole arms, or other large weapons.",
      ids: [1, 2, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15]
    },
    specialAbilities: {
      description: "A halfling gains several combat bonuses (some due to their small size) and can hide easily in woodlands.",
      abilities: [
        {
          title: "Combat.",
          description: "You have a -2 bonus to armor class when attacked by creatures larger than man-sized. +1 to hit with any missile."
        },
        {
          title: "Hiding",
          description: "Outdoors, halflings are difficult to spot, having the ability to seemingly vanish into woods or underbrush. In such cover, they can only be detected 10% of the time. Indoors halflings can hide in shadows on a roll of 1 or 2 on a d6.",
        }
      ]
    },
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
