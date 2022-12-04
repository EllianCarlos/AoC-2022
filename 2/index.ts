import { readFile, getLettersFromLine } from "../utils";

const DAY = 2;

enum GAME {
  Rock = "A",
  Paper = "B",
  Scissors = "C",
}

type PossibleResults = "LOSE" | "DRAW" | "WIN";
type PlayableInstructions = "X" | "Y" | "Z";

enum GAME_RESULT {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}

const resultPoints = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
};

const shapePoints: Record<GAME, number> = {
  [GAME.Rock]: 1,
  [GAME.Paper]: 2,
  [GAME.Scissors]: 3,
};

const gameSolution: Record<string, string> = {
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

const calculateScoreGivenResult = (
  result: GAME_RESULT,
  oponent: GAME
): number[] => {
  let myScore = 0;
  let oponentScore = 0;
  let myPlay: GAME;

  if (result === GAME_RESULT.WIN) {
    myScore += 6;
    myPlay = gameSolution[oponent] as GAME;
  } else if (result === GAME_RESULT.DRAW) {
    myScore += 3;
    oponentScore += 3;
    myPlay = oponent as GAME;
  } else {
    oponentScore += 6;
    myPlay = gameSolution[gameSolution[oponent]] as GAME;
  }

  myScore += shapePoints[myPlay];
  oponentScore += shapePoints[oponent];

  return [myScore, oponentScore];
};

export default function main() {
  const lines = readFile(DAY);

  const parsedLines = lines.map(getLettersFromLine);

  parsedLines.pop();

  const gameScore = parsedLines.reduce(
    (totalScores: number[], [oponent, selected]: string[]): number[] => {
      const result = GAME_RESULT[selected as keyof typeof GAME_RESULT];

      const scoreResults = calculateScoreGivenResult(result, oponent as GAME);

      totalScores[0] += scoreResults[0];
      totalScores[1] += scoreResults[1];

      return totalScores;
    },
    [0, 0]
  );

  console.log(gameScore);
}

main();
