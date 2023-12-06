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
// const smallSampleInput = ['467..114..', '...*......', '..35..633.'];

const sampleOutput = 467835;

describe.only('day3', () => {
  describe('gearRatios', () => {
    it('correctly sums the value of all the gear ratios in the engine schematic', () => {
      expect(gearRatios(sampleInput)).toBe(sampleOutput);
    });
  });
});
