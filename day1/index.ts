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

/*
--- Day 1: Trebuchet?! ---
Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.

You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").

As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.

The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

For example:

1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

Consider your entire calibration document. What is the sum of all of the calibration values?

Your puzzle answer was 55607.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and last digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.

What is the sum of all of the calibration values?

Your puzzle answer was 55291.

Both parts of this puzzle are complete! They provide two gold stars: **
*/
