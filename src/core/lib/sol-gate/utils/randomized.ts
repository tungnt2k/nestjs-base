/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { random } from 'lodash';
/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 *
 * For example:
 * - items = ['dragon', 'rat', 'dog', 'cat', 'snake']
 * - weights = [0.1, 0.1, 0.2, 0.4, 0.2]
 * - weightedRandom(items, weights) in 10% of cases will return 'dragon' or 'rat', in 20% of cases will return
 * 'dog' or 'snake' and 40% cases will never return 'dog'
 *
 * @param {any[]} items
 * @param {number[]} weights
 * @returns {{item: any, index: number}}
 */

export const weightedRandom = <T>(items: T[], weights: number[]): { item: any; index: number } | undefined => {
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
  const cumulativeWeights: number[] = [];
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
      return {
        item: items[itemIndex],
        index: itemIndex,
      };
    }
  }
};

export const weightedShuffle = <T>(items: T[], weights: number[]): T[] => {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }

  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  const result: T[] = [];
  const weightLength = weights.length;

  for (let i = 0; i < weightLength; i += 1) {
    const randItem = weightedRandom<T>(items, weights);
    if (randItem) {
      result.push(randItem.item);
      items.splice(randItem.index, 1);
      weights.splice(randItem.index, 1);
    }
  }

  return result;
};

export const generateRandomEvenOddByResult = (result: boolean): number => {
  const randNum = random(1, 100000000);

  if (randNum % 2) {
    return result ? randNum + 1 : randNum;
  }

  return result ? randNum : randNum + 1;
};

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomFromInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
