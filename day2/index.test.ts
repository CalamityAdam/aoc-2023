import {
  buildGame,
  gameChecker,
  getGamePower,
  isPossible,
  sumGamePowers,
} from './index';

describe('day2', () => {
  describe('buildGame', () => {
    it('should build the game object correctly', () => {
      const inputGame =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
      const expectedGame = {
        id: 1,
        cubes: {
          red: 4,
          green: 2,
          blue: 6,
        },
      };

      const result = buildGame(inputGame);

      expect(result).toEqual(expectedGame);
    });
  });

  describe('isPossible', () => {
    // const maxRedCount = 12;
    // const maxGreenCount = 13;
    // const maxBlueCount = 14;

    it('should return true if the game is possible', () => {
      const game = {
        id: 1,
        cubes: {
          red: 4,
          green: 2,
          blue: 6,
        },
      };

      const result = isPossible(game);

      expect(result).toBe(true);
    });

    it('should return false if the game is not possible', () => {
      const game = {
        id: 1,
        cubes: {
          red: 40,
          green: 2,
          blue: 7,
        },
      };

      const result = isPossible(game);

      expect(result).toBe(false);
    });
  });

  describe('gameChecker', () => {
    it('should return the sum of all possible games', () => {
      const gameSet =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';
      const result = gameChecker(gameSet);

      expect(result).toBe(8);
    });
  });

  describe('getGamePower', () => {
    it('should return the power of the game', () => {
      const game = buildGame(
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
      );
      const game2 = buildGame(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red'
      );

      const result = getGamePower(game);
      const result2 = getGamePower(game2);

      expect(result).toBe(48);
      expect(result2).toBe(1560);
    });
  });

  describe('sumGamePowers', () => {
    it('should return the sum of all game powers', () => {
      const gameSet =
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';

      const result = sumGamePowers(gameSet);

      expect(result).toBe(2286);
    });
  });
});
