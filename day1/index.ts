import fs from 'fs';

const inputValues: string = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

/* ⭐⭐⭐ PART ONE ⭐⭐⭐ */
function sumCalibrationValues(input: string): number {
  const sum = input.split(/\r?\n/).reduce((acc, line) => {
    const firstDigitMatch = line.match(/\d/);
    const lastDigitMatch = line.match(/\d(?=[^\d]*$)/);

    if (firstDigitMatch && lastDigitMatch) {
      const firstDigit = firstDigitMatch[0];
      const lastDigit = lastDigitMatch[0];

      // concat first and last digit to make new 2 digit number
      const newNumber = firstDigit + lastDigit;
      // convert new number to integer
      const newNumberInt = parseInt(newNumber, 10);
      // add new number to accumulator
      return acc + newNumberInt;
    }

    return acc;
  }, 0);

  return sum;
}

// console.log('sum: ', sumCalibrationValues(inputValues));

/* ⭐⭐⭐ PART TWO ⭐⭐⭐ */

function replaceNumbers(input: string): string {
  let result = input;
  const replacements: { [key: string]: string } = {
    one: 'o1e',
    two: 't2o',
    three: 't3e',
    four: '4',
    five: '5e',
    six: '6',
    seven: '7n',
    eight: 'e8t',
    nine: 'n9e',
  };

  // regular expression pattern that matches all keys in the replacements map
  const pattern = new RegExp(Object.keys(replacements).join('|'), 'gi');
  let match: RegExpMatchArray | null = null;

  do {
    // reset match
    match = null;

    // check for remaining match
    match = result.match(pattern);

    if (match) {
      // replace match with value from map
      result = result.replace(match[0], replacements[match[0].toLowerCase()]);
    }
  } while (match);

  return result;
}

function tuplifyFirstAndLastDigits(
  input: string
): [string, string] | [null, null] {
  const firstDigitMatch = input.match(/\d/);
  const lastDigitMatch = input.match(/\d(?=[^\d]*$)/);

  if (firstDigitMatch && lastDigitMatch) {
    const firstDigit = firstDigitMatch[0];
    const lastDigit = lastDigitMatch[0];

    return [firstDigit, lastDigit];
  }

  return [null, null];
}

function sumCalibrationValues2(lines: string[]): number {
  return lines.reduce((sum, line) => {
    const replaced = replaceNumbers(line);
    const [firstDigit, lastDigit] = tuplifyFirstAndLastDigits(replaced);

    if (firstDigit && lastDigit) {
      // concat first and last digit to make new 2 digit number
      const newNumber = firstDigit + lastDigit;
      // convert new number to integer
      const newNumberInt = parseInt(newNumber, 10);
      // add new number to accumulator
      return sum + newNumberInt;
    }

    return sum;
  }, 0);
}

console.log('sum: ', sumCalibrationValues2(inputValues.split(/\r?\n/)));

export {
  replaceNumbers,
  sumCalibrationValues,
  sumCalibrationValues2,
  tuplifyFirstAndLastDigits,
};
