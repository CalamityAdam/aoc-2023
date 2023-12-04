import fs from 'fs';

const inputValues: string = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

const maxRedCount = 12;
const maxGreenCount = 13;
const maxBlueCount = 14;

/*
example games:
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green

instructions:
Determine which games would have been possible if the bag had been loaded with
only **12 red cubes, 13 green cubes, and 14 blue cubes**. What is the sum of the IDs
of those games?
*/

interface Game {
  id: number;
  cubes: Cubes;
}
interface Cubes {
  red: number; //  max number of cubes of that color in a single hand in a game
  green: number;
  blue: number;
}

// parse input into array of games
function buildGame(inputGame: string): Game {
  if (!inputGame.length) {
    return {
      id: 0,
      cubes: {
        red: 0,
        green: 0,
        blue: 0,
      },
    };
  }

  // sample game: Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  const id = inputGame.split(':')[0].split(' ')[1];
  const hands = inputGame.split(':')[1].split(';');

  let newGame: Game = {
    id: Number(id),
    cubes: {
      red: 0,
      green: 0,
      blue: 0,
    },
  };

  hands.forEach((hand) => {
    // hand = ' 1 red, 2 green, 6 blue'
    const parts = hand.split(',');
    // parts = [' 1 red', ' 2 green', ' 6 blue']

    parts.forEach((part, index) => {
      parts[index] = part.trim();
    });
    // parts = ['1 red', '2 green', '6 blue']

    // build counts
    parts.forEach((part, index) => {
      // part = '1 red'
      const colorName = part.split(' ')[1];
      const colorCount = Number(part.split(' ')[0]);
      if (colorName in newGame.cubes) {
        // if colorCount is higher than current count, replace
        if (colorCount > newGame.cubes[colorName as keyof Cubes]) {
          newGame.cubes[colorName as keyof Cubes] = colorCount;
        }
      }
    });
  });

  return newGame;
}

// check if game is possible
function isPossible(game: Game): boolean {
  const redCount = game.cubes.red;
  const greenCount = game.cubes.green;
  const blueCount = game.cubes.blue;

  if (
    redCount <= maxRedCount &&
    greenCount <= maxGreenCount &&
    blueCount <= maxBlueCount
  ) {
    return true;
  } else {
    return false;
  }
}

// check games
function gameChecker(inputGames: string): number {
  const possibleGames: number[] = [];
  const games = inputGames.split(/\r?\n/);

  games.forEach((game) => {
    const newGame = buildGame(game);

    if (isPossible(newGame)) {
      possibleGames.push(newGame.id);
    }
  });

  const sum = possibleGames.reduce((a, b) => a + b, 0);
  return sum;
}

// The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together
function getGamePower(game: Game): number {
  const redCount = game.cubes.red;
  const greenCount = game.cubes.green;
  const blueCount = game.cubes.blue;

  return redCount * greenCount * blueCount;
}

function sumGamePowers(inputGames: string): number {
  const games = inputGames.split(/\r?\n/);
  let sum = 0;

  games.forEach((game) => {
    const newGame = buildGame(game);
    sum += getGamePower(newGame);
  });

  return sum;
}

const game1 = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';

const gameSet = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

// console.log(gameChecker(gameSet));

// console.log(sumGamePowers(inputValues));

export { buildGame, gameChecker, getGamePower, isPossible, sumGamePowers };
