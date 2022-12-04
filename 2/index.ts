import { readFile, getLettersFromLine } from "../utils";

const DAY = 2;

enum GAME {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

enum GAME_RESULT {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}
const shapePoints: Record<GAME, number> = {
  [GAME.Rock]: 1,
  [GAME.Paper]: 2,
  [GAME.Scissors]: 3,
};

const gameSolution: Record<GAME, GAME> = {
  [GAME.Rock]: GAME.Paper,
  [GAME.Paper]: GAME.Scissors,
  [GAME.Scissors]: GAME.Rock,
};

/**
 * Always calculated based on the fist player (AKA playerA).
 */
const calculateScore = (playerA: GAME, playerB: GAME): number => {
  let score = 0;
  if (playerA === playerB) score += 3;
  else if (gameSolution[playerB] === playerA) score += 6;

  score += shapePoints[playerA];

  return score;
};

const calculateScoresGivenResult = (result: GAME_RESULT, oponent: GAME) => {
  let myScore = 0;
  let oponentScore = 0;
  let myPlay: GAME;

  if (result === GAME_RESULT.WIN) {
    myScore += 6;
    myPlay = gameSolution[oponent];
  } else if (result === GAME_RESULT.DRAW) {
    myScore += 3;
    oponentScore += 3;
    myPlay = oponent;
  } else if (result === GAME_RESULT.LOSE) {
    oponentScore += 6;
    myPlay = gameSolution[gameSolution[oponent]];
  } else {
    console.log(result);
    throw new Error();
  }

  myScore += shapePoints[myPlay];
  oponentScore += shapePoints[oponent];

  return { myScore, oponentScore };
};

export default function main() {
  const lines = readFile(DAY);

  const parsedLines = lines.map(getLettersFromLine);

  parsedLines.pop();

  const gameScore = parsedLines.reduce(
    (totalScores: number[], [oponent, selected]: string[]): number[] => {
      const scoreResults = calculateScoresGivenResult(
        selected as GAME_RESULT,
        oponent as GAME
      );

      totalScores[0] += scoreResults.myScore;
      totalScores[1] += scoreResults.oponentScore;

      return totalScores;
    },
    [0, 0]
  );

  console.log(gameScore);
}

main();
