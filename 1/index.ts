import { readFile, isEmptyString } from "../utils";

const DAY = 1;

function main() {
  const lines = readFile(DAY);

  const caloriesByElf = lines.reduce(
    (caloriesByElfAccumulator: number[], calories: string): number[] => {
      if (caloriesByElfAccumulator.length === 0)
        caloriesByElfAccumulator.push(0);

      const lastAccumulatorIndex = caloriesByElfAccumulator.length - 1;

      if (isEmptyString(calories)) caloriesByElfAccumulator.push(0);
      else caloriesByElfAccumulator[lastAccumulatorIndex] += Number(calories);

      return caloriesByElfAccumulator;
    },
    []
  );

  const topThreeElfs = caloriesByElf.reduce(
    (topThreeElfs: number[], actualCalories: number): number[] => {
      if (topThreeElfs.length === 0) {
        topThreeElfs.push(actualCalories);
        topThreeElfs.push(0);
        topThreeElfs.push(0);
      } else {
        if (actualCalories > topThreeElfs[0]) {
          topThreeElfs[2] = topThreeElfs[1];
          topThreeElfs[1] = topThreeElfs[0];
          topThreeElfs[0] = actualCalories;
        } else if (actualCalories > topThreeElfs[1]) {
          topThreeElfs[2] = topThreeElfs[1];
          topThreeElfs[1] = actualCalories;
        } else if (actualCalories > topThreeElfs[2]) {
          topThreeElfs[2] = actualCalories;
        }
      }

      return topThreeElfs;
    },
    []
  );

  const threeElfsSum = topThreeElfs.reduce((a, b) => a + b);

  console.log(
    `The three most calories carried by an elf are ${topThreeElfs.join(", ")}.`
  );

  console.log(`Together these three elfs are carrying: ${threeElfsSum}`);
}

main();
