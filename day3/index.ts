import { readFileSync } from 'fs';

/**
 *
 * @param input array of lines, should be split on newlines before passing in
 * @returns
 */
function gearRatios(input: string[]): number {
  let gearRationSum = 0;

  for (let y = 0; y < input.length; ++y) {
    if (!input[y].length) {
      continue;
    }
    for (let x = 0; x < input[y].length; ++x) {
      const char = input[y][x];
      if (char === '*') {
        const [num1, num2] = findAdjacentPartNumbers(input, x, y);

        if (num1 && num2) {
          gearRationSum += num1 * num2;
        }
      }
    }
  }

  return gearRationSum;
}

function findAdjacentPartNumbers(
  arr: string[],
  x: number,
  y: number
): [number, number] | [null, null] {
  const adjacentCoords = [
    [y - 1, x - 1],
    [y - 1, x],
    [y - 1, x + 1],
    [y, x - 1],
    [y, x + 1],
    [y + 1, x - 1],
    [y + 1, x],
    [y + 1, x + 1],
  ];

  const partNumbers: number[] = [];

  for (const [adjY, adjX] of adjacentCoords) {
    const partNumber = extractPartNumber(arr, adjX, adjY);

    if (partNumber !== null && !partNumbers.includes(partNumber)) {
      partNumbers.push(partNumber);
    }
  }

  console.log(partNumbers);
  if (partNumbers.length === 2) {
    return [partNumbers[0], partNumbers[1]];
  }

  return [null, null];
}

function extractPartNumber(arr: string[], x: number, y: number): number | null {
  if (y < 0 || y >= arr.length || x < 0 || x > arr[y].length) {
    return null;
  }

  const char = arr[y][x];

  if (/\d/.test(char)) {
    // extract the full part number
    let fullNumber = char;

    // check left
    for (let i = x - 1; i >= 0 && /\d/.test(arr[y][i]); --i) {
      fullNumber = arr[y][i] + fullNumber;
    }

    // check right
    for (let i = x + 1; i < arr[y].length && /\d/.test(arr[y][i]); ++i) {
      fullNumber += arr[y][i];
    }

    return parseInt(fullNumber);
  }

  return null;
}

export { gearRatios };

function solveDay3() {
  const input = readFileSync(`${__dirname}/input.txt`, 'utf8');
  const lines = input.split('\n').filter((line) => line.length > 0);
  const sum = gearRatios(lines);

  console.log('sum: ', sum);
}

// solveDay3();
