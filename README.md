# Basic DnD Character

Is a restful API for creating red box (Mentzer) Dungeons and Dragons Characters.

## End Points

### /api/scores
_version 1.0_

#### GET
_?Strength=15&Intelligence=8&Wisdom=7&Dexterity=8&Constitution=18&Charisma=11_

Returns an array of characters from the red box. The array is filtered by scores and sorted by experience point bonus.

### /api/equipment/?name=Cleric
_version 1.0.0_

#### GET
Returns starting money and available equipment. Weapons and armor are filtered to show only the options and character may use.

### /api/equipment/
_version 1.0.1_

#### GET
Returns all weapons, armor and equipment.





### TODO
 1. Endpoint Just scores
 2. Endpoint Single Class
 3. Endpoint All Classes Alpha
