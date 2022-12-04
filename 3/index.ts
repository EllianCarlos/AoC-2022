import { readFile } from "../utils";

const DAY = 3;

const getItemPriority = (item: string) => {
  const priorities = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return priorities.search(item) + 1;
};

const getSumOfCommonItemsInKnapsack = (knapsack: string): number => {
  const middleIndex = Math.ceil(knapsack.length / 2);
  const firstHalfKnapsack = knapsack.substring(0, middleIndex);
  const secondHalfKnapsack = knapsack.substring(middleIndex);

  let itemSum = 0;

  let alreadyFindedCommonItems: string[] = [];

  for (let item of firstHalfKnapsack) {
    if (secondHalfKnapsack.includes(item) && !alreadyFindedCommonItems.includes(item)) {
      itemSum += getItemPriority(item);
	  alreadyFindedCommonItems.push(item);
    }
  }

  return itemSum;
};

function main() {
  const lines = readFile(DAY);
  lines.pop();

  const total = lines.reduce((totalItem: number, actualKnapsack: string) => {
    totalItem += getSumOfCommonItemsInKnapsack(actualKnapsack);
	return totalItem;
  }, 0);

  console.log(total);
}

main();
