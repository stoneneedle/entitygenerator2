import { DiceRoll } from "@dice-roller/rpg-dice-roller";

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function choose(array) {
  if (Array.isArray(array)) {
    return array[Math.floor(Math.random() * array.length)];
  } else {
    return null;
  }
}

// Fisher-Yates Shuffle
export function shuffle(array) {
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

// Validate roll expression
export function isValidRoll(diceRoll) {
  let diceRegex = /(([0-9]+)[d]([0-9]+)((kh|kl*)([0-9]*))*([+\-*/]*)([0-9]*))/;
  let search = diceRoll.search(diceRegex);
  let match = diceRoll.match(diceRegex);

  if (search === -1) {
    return false;
  } else {
    let numDice = parseInt(match[2]);
    let dieType = parseInt(match[3]);
    let khkl = match[5];
    let khklNum = parseInt(match[6]);
    let modType = match[7];
    let mod = parseInt(match[8]);

    let khklExists = (typeof khkl !== 'undefined');
    let khklValid = ((khkl === "kh") || (khkl === "kl")) &&
                    (Number.isInteger(khklNum));
    
    let modExists = (modType !== '');
    let modValid = (
      (modType === "+") || 
                      (modType === "-") ||
                      (modType === "*") ||
                      (modType === "/")) &&
                    (!isNaN(mod)) &&
                    (Number.isInteger(mod));

    // validate base dice expression (i.e. 3d6)
    if ((Number.isInteger(numDice)) && (Number.isInteger(dieType))) {
      // khkl validation if khkl present (mod also validated)
      if (khklExists) {
        if (khklValid) {
          if (modExists) {
            if (modValid) {
              return true;
            }
            return false;
          }
          return true;
        }
        return false;
      }

      // If mod exists with no khkl
      if (modExists) {
        if (modValid) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }
}

// Identify and evaluate a potential dice string
export function findEvalDice(potentialDiceStr) {
  let potentialDiceStrArr = potentialDiceStr.split(" ");

  for (let i = 0; i < potentialDiceStrArr.length; i++) {
    let diceRegex = /(([0-9]+)[d]([0-9]+)((kh|kl*)([0-9]*))*([+\-*/]*)([0-9]*))/;

    let search = potentialDiceStrArr[i].search(diceRegex);

    if ((search !== -1) && isValidRoll(potentialDiceStrArr[i])) {
      if ((search !== -1)) {
        potentialDiceStrArr[i] = String(new DiceRoll(potentialDiceStrArr[i]).total);
      }
    }
  }
  return potentialDiceStrArr.join(" ");
}

/** SRC: https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/statistics/weighted-random/weightedRandom.js
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['banana', 'orange', 'apple']
 * - weights = [0, 0.2, 0.8]
 * - weightedRandom(items, weights) in 80% of cases will return 'apple', in 20% of cases will return
 * 'orange' and it will never return 'banana' (because probability of picking the banana is 0%)
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */
/* eslint-disable consistent-return */
export function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  // Preparing the cumulative weights array.
  // For example:
  // - weights = [1, 4, 3]
  // - cumulativeWeights = [1, 5, 8]
  const cumulativeWeights = [];
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }

  // Getting the random number in a range of [0...sum(weights)]
  // For example:
  // - weights = [1, 4, 3]
  // - maxCumulativeWeight = 8
  // - range for the random number is [0...8]
  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
  const randomNumber = maxCumulativeWeight * Math.random();

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return items[itemIndex];
      // return {
      //   item: items[itemIndex],
      //   index: itemIndex,
      // };
    }
  }
}

// Pull element from 2D list, return 1D list
export function arrayPullElem(array2D, elemIndex=0) {
  let outputArray = [];

  for (let i = 0; i < array2D.length; i++) {
    outputArray.push(array2D[i][elemIndex]);
  }

  return outputArray;
}
