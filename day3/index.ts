import { readFileSync } from 'fs';
/*
any number adjacent to a symbol, even diagonally, is a "part number" and should
be included in your sum. (Periods (.) do not count as a symbol.)

sample input:
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..

part numbers = 467, 35, 633, 617, 592, 755, 664, 598

sample output: 4361
*/

/*

given a multi-line string input
create empty array of allPartNumbers
iterate over each line.
for each line, iterate over each character

if period, skip & continue
🚀 could build some sort of mapping system here for blocks?

if a number: start building a PartNumber, check if is valid

step to next character, if another number how do we continue building the
previous PartNumber?
keep a "previous" state in the outer loop. initial null
at beginning of inner loop, const partNumber: PartNumber = previous ? previous : new PartNumber

if number: grab previous or new, concat id, check if isValid and set true if so otherwise skip, set previous = new

❓ is it valid part number if it's adjacent another number but not adjacent a _symbol_ per se
a literalist would say the instructions say any number adjacent a symbol, not "adjacent a number"


at end of inner loop, push PartNumber
outer loop just sets previous as null

isValid function should take the original input an X and Y index (X being inner loop and Y being outer loop)
set isValid = false;
need to check 8 positions: x-1 y-1, x y-1, x+1 y-1, x-1 y, x+1 y, x-1 y+1, x y+1, x+1 y+1
if any are symbol (regex check) then set isValid = true and return 
or just return false at end of function and true if symbol is found


after loops have completed, const validPartNumbers = allPartNumbers.filter(pn => pn.isValid);

sum validPns

another approach would be to iterate and search for symbols and then grab any numbers adjacent to the symbol

🤔 potential clashing issue, storing duplicate partNumbers somehow. could hash an id based off indices to avoid duplication

interface PartNumber {
  id: string; // default: ''
  isValid: boolean; // default: false
}
*/

interface PartNumber {
  id: string;
  isValid: boolean;
}

function PartNumber(): PartNumber {
  return {
    id: '',
    isValid: false,
  };
}

/**
 *
 * @param input array of lines, should be split on newlines before passing in
 * @returns
 */
function gearRatios(input: string[]): number {
  const allPartNumbers: PartNumber[] = [];

  for (let y = 0; y < input.length; ++y) {
    if (!input[y].length) {
      continue;
    }

    // Y axis
    let previous: PartNumber | null = null;

    for (let x = 0; x < input[y].length; ++x) {
      const char = input[y][x];
      // X axis
      // if is not a number continue
      if (!/\d/.test(char)) {
        continue;
      }

      const partNumber: PartNumber = previous ? previous : PartNumber();
      partNumber.id += char;

      // don't bother checking if we already know it's valid
      if (!partNumber.isValid && isValid(input, x, y)) {
        partNumber.isValid = true;
      }

      // if next char is not a number then push to allPns
      if (!/\d/.test(input[y][x + 1])) {
        // store this part number, clear out previous state
        allPartNumbers.push(partNumber);
        previous = null;
      } else {
        previous = partNumber;
      }
    }
  }

  const validPartNumbers = allPartNumbers.filter((pn) => pn.isValid);
  const sum = validPartNumbers.reduce((sum, pn) => sum + Number(pn.id), 0);
  return sum;
}

function isValid(arr: string[], x: number, y: number): boolean {
  const checks = [
    arr[y - 1]?.[x - 1],
    arr[y - 1]?.[x],
    arr[y - 1]?.[x + 1],
    arr[y]?.[x - 1],
    arr[y]?.[x + 1],
    arr[y + 1]?.[x - 1],
    arr[y + 1]?.[x],
    arr[y + 1]?.[x + 1],
  ];

  const regex = /[+\*=\-&#\/%$@]/;
  const isValid = checks.some((char: string) => char && regex.test(char));
  return isValid;
}

export { gearRatios };

function solveDay3() {
  const input = readFileSync(`${__dirname}/input.txt`, 'utf8');
  const lines = input.split('\n').filter((line) => line.length > 0);
  const sum = gearRatios(lines);

  console.log('sum: ', sum);
}

// solveDay3();
