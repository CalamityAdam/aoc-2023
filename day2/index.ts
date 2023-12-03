import fs from 'fs';

const inputValues: string = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

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

const game1 = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
console.log(buildGame(game1));

// inputGames.split(/\r?\n/)
// build Game objects
