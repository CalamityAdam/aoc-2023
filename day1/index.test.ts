import {
  replaceNumbers,
  sumCalibrationValues2 as sumCalibrationValues,
  tuplifyFirstAndLastDigits,
} from './index';

describe('replaceNumbers', () => {
  it('replaces spelled out numbers with digits', () => {
    const input = 'one two three four five six seven eight nine';
    const result = replaceNumbers(input);
    expect(result).toBe('o1e t2o t3e 4 5e 6 7n e8t n9e');
  });

  it('handles provided test cases', () => {
    const input1 = 'two1nine';
    const input2 = 'eightwothree';
    const input3 = 'abcone2threexyz';
    const input4 = 'xtwone3four';
    const input5 = 'zoneight234';

    const result1 = replaceNumbers(input1);
    const result2 = replaceNumbers(input2);
    const result3 = replaceNumbers(input3);
    const result4 = replaceNumbers(input4);
    const result5 = replaceNumbers(input5);

    expect(result1).toBe('t2o1n9e');
    expect(result2).toBe('e8t2ot3e');
    expect(result3).toBe('abco1e2t3exyz');
    expect(result4).toBe('xt2o1e34');
    expect(result5).toBe('zo1e8t234');
  });

  it('handles empty input', () => {
    const input = '';
    const result = replaceNumbers(input);
    expect(result).toBe('');
  });

  it('handles input with leading/trailing whitespace', () => {
    const input = '  one two three  ';
    const result = replaceNumbers(input);
    expect(result).toBe('  o1e t2o t3e  ');
  });
});

describe('tuplifyFirstAndLastDigits', () => {
  // returns an array with first and last digit in provided string
  it('returns an array with first and last digit', () => {
    const input = '123456789';
    const input2 = 'one2three4five6seven8nine';
    const result = tuplifyFirstAndLastDigits(input);
    const result2 = tuplifyFirstAndLastDigits(input2);
    expect(result).toEqual(['1', '9']);
    expect(result2).toEqual(['2', '8']);
  });

  // returns array with empty strings when no matches are found
  it('returns null array when no matches are found', () => {
    const input = 'no matches';
    const result = tuplifyFirstAndLastDigits(input);
    expect(result).toEqual([null, null]);
  });
});

describe('sumCalibrationValues', () => {
  it('returns the sum of two-digit numbers from spelled out numbers', () => {
    const input = ['one two', 'three four', 'five six'];
    const result = sumCalibrationValues(input);
    expect(result).toBe(102); // 12 + 34 + 56 = 102
  });

  it('handles empty input', () => {
    const input = [''];
    const result = sumCalibrationValues(input);
    expect(result).toBe(0);
  });

  it('handles input with only one line', () => {
    const input = ['seven eight'];
    const result = sumCalibrationValues(input);
    expect(result).toBe(78);
  });

  it('handles input with leading/trailing whitespace', () => {
    const input = ['  four two  ', '  five 6  '];
    const result = sumCalibrationValues(input);
    expect(result).toBe(98); // 42 + 56 = 98
  });

  it('handles the provided test case', () => {
    const input = [
      'two1nine', // extracted = 219, evaluated number = 29
      'eightwothree', // extracted = 823, evaluated number = 83
      'abcone2threexyz', // extracted = 123, evaluated number = 13
      'xtwone3four', // extracted = 234, evaluated number = 24
      '4nineeightseven2', // extracted = 49872, evaluated number = 42
      'zoneight234', // extracted = 18234, evaluated number = 14
      '7pqrstsixteen', // extracted = 76, evaluated number = 76
    ];

    const result = sumCalibrationValues(input);

    //In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76.
    // Adding these together produces 281.
    expect(result).toBe(281);
  });
});

// describe('convertSpelledOutNumbers', () => {
//   it('returns an array with first and last digit when digits are spelled out', () => {
//     const input = ['one two six'];
//     const result = convertSpelledOutNumbers(input);
//     expect(result).toEqual(['1', '6']);
//   });

//   it('returns an empty array when no matches are found', () => {
//     const input = ['no matches'];
//     const result = convertSpelledOutNumbers(input);
//     expect(result).toEqual([]);
//   });

//   it('handles a mix of digits and spelled out digits', () => {
//     const input = ['1 two 3 four 5 six 7 eight'];
//     const result = convertSpelledOutNumbers(input);
//     expect(result).toEqual(['1', '8']);
//   });

//   it('leading/trailing whitespace', () => {
//     const input = ['  nine four  '];
//     const result = convertSpelledOutNumbers(input);
//     expect(result).toEqual(['9', '4']);
//   });
// });
