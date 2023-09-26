import { choose, shuffle, findEvalDice } from './randomLib.js';

export class EntityGenerator {
  entityObjects = [];

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
        let currentTable = entityGeneratorObjects[i].entityData[j];
        let tableVals = currentTable.tableValues;
        let tableChoices = currentTable.choices;
        let tableDups = currentTable.duplicates;
        let tableDice = currentTable.evalDice;

        let entityTable = {
          tableName: entityGeneratorObjects[i].entityData[j].tableName,
          tableValues: this.randTable(tableVals, tableChoices, tableDups, tableDice)
        }
        entityObject.entityData.push(entityTable);
      }
      this.entityObjects.push(entityObject);
    }
  }

  randTable(tableValues, choices, duplicates, evalDice) {
    let tableValuesCopy = JSON.parse(JSON.stringify(tableValues));
    let choicesArr = [];

    if (choices > tableValues.length) {
      choices = tableValues.length;
    }
    if (duplicates) {
      for(let i = 0; i < choices; i++) {
        if (evalDice) {
          choicesArr.push(findEvalDice(choose(tableValuesCopy)));
        } else {
          choicesArr.push(choose(tableValuesCopy));
        }
      }
    } else {
      for (let i = 0; i < choices; i++) {
        if (evalDice) {
          choicesArr.push(findEvalDice(shuffle(tableValuesCopy).pop()));
        } else {
          choicesArr.push(shuffle(tableValuesCopy).pop());
        }
      }
    }
    return choicesArr
  }
}
