import { gearRatios } from './index';

const sampleInput = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];
// part numbers = 467, 35, 633, 617, 592, 755, 664, 598

const sampleOutput = 4361;

describe.only('day3', () => {
  describe('gearRatios', () => {
    it('correctly sums the value of all the part numbers in the engine schematic', () => {
      expect(gearRatios(sampleInput)).toBe(sampleOutput);
    });
  });
});
