// Importless (and node-able) version of the engine
// Takes an entity generator, outputs an entity

// Fisher-Yates Shuffle
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let potentialDiceString = "They have 3d6 kobolds.";

function findEvalDice(potentialDiceString) {
  let diceRegex = /(([0-9]+)[d]([0-9]+)((kh|kl*)([0-9]*))*([+\-*/]*)([0-9]*))/;

  let search = potentialDiceString.search(diceRegex);
  let match = potentialDiceString.match(diceRegex);

  return match;

  if (search === -1) {
    return potentialDiceString;
  } else {
    let diceExpr = match[1];
    let numDice = match[2];
    // let khl, kh, kl = false;





    return null;
  }

  // return search;
}

console.log(findEvalDice(potentialDiceString));

// regex
// (([0-9]+)[d]([0-9]+)([+\-*/])([0-9]+))

// function randInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

function choose(array) {
  if (Array.isArray(array)) {
    return array[Math.floor(Math.random() * array.length)];
  } else {
    return null;
  }
}

let appdata_str = `
{
  "entityGeneratorObjects": [
    {
      "entityName": "NPC Generator 1",
      "entityData": [
        {
          "tableName": "npcName",
          "tableValues": ["Derek", "Jamal", "Jack"],
          "rollMethod": "randTable",
          "choices": 1,
          "evalDice": true,
          "evalObjects": true
        },
        {
          "tableName": "npcHobbies",
          "tableValues": ["Fishing", "Hiking", "Falconry", "Swimming", "Whittling", "Chess"],
          "rollMethod": "randTable",
          "choices": 3,
          "evalDice": true,
          "evalObjects": true
        }  
      ]
    },
    {
      "entityName": "Item 1",
      "entityData": [
        {
          "tableName": "itemPersonality",
          "tableValues": ["Has the personality of {{npc1}}", "Enlightened", "Greedy"],
          "rollMethod": "randTable",
          "choices": 1,
          "evalDice": true,
          "evalObjects": true
        }
      ]
    },
    {
      "entityName": "Encounters 1",
      "entityData": [
        {
          "tableName": "marshEncounters",
          "tableValues": ["3d6 kobolds", "2d4 orcs", "3d10 rats", "You meet up with: {{npc1}}"],
          "rollMethod": "randTable",
          "choices": 1,
          "evalDice": true,
          "evalObjects": true
        }
      ]
    }
  ],
  "entityObjects": []
}
`;

let appdata = JSON.parse(appdata_str);

// Translate an entity generator into an output entity
class EntityGenerator {
  entitiesOutput = {
    entityObjects: []
  };

  constructor(entityGeneratorObjects) {
    this.entityGeneratorObjects = entityGeneratorObjects;

    // loop through entity generator objects and produce output entity
    for (let i = 0; i < entityGeneratorObjects.length; i++) {
      let entityObject = {
        entityName: entityGeneratorObjects[i].entityName,
        entityData: []
      };

      // loop through entity table objects (usually a randTable) and output result
      for (let j = 0; j < entityGeneratorObjects[i].entityData.length; j++) {
        let entityTable = {
          tableName: entityGeneratorObjects[i].entityData[j].tableName,
          tableValues: choose(entityGeneratorObjects[i].entityData[j].tableValues)
        }
        
        entityObject.entityData.push(entityTable);
      }

      this.entitiesOutput.entityObjects.push(entityObject);
    }
  }

  randTable(tableValues, choices, duplicates, evalDice, evalObjects) {
    let choicesArr = [];

    if (choices > tableValues.length) {
      choices = tableValues.length;
    }

    if (duplicates) {
      for(let i = 0; i < choices; i++) {
        choicesArr.push(choose(tableValues));
      }
    } else {
      for (let i = 0; i < choices; i++) {
        choicesArr.push(shuffle(tableValues).pop());
      }
    }

    return choicesArr
  }

}

let eg = new EntityGenerator(appdata.entityGeneratorObjects);

let testRandTableStr = `
{
  "entityData": [
    {
      "tableName": "npcName",
      "tableValues": ["Derek", "Jamal", "Jack"],
      "rollMethod": "randTable",
      "choices": 4,
      "duplicates": false,
      "evalDice": true,
      "evalObjects": true
    }
  ]
}
`;

let testRandTable = JSON.parse(testRandTableStr);

// console.log(eg.randTable(testRandTable.entityData[0].tableValues, testRandTable.entityData[0].choices, testRandTable.entityData[0].duplicates, testRandTable.entityData[0].evalDice, testRandTable.entityData[0].evalObjects));


// console.log(eg.entitiesOutput.entityObjects[0]);

