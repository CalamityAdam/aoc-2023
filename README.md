# Advent of Code 2023

## Local Development

To begin local development, run `yarn` to install all dependencies.

To run the entire test suite, run `yarn test`.

To run the code for a specific day, run `yarn start:day<day number>` e.g.: `yarn start:day3` will begin a nodemon session running the provided day's index.ts file. Each day's index.ts file should include a commented out console.log which will log the day's solution. Simply uncomment that line and save the file for nodemon to execute it.

### Adding a new day

Start by running the provided `yarn add:day <day number>` script to generate the base files.

For example, running the following command will create the `day3` directory and sub files: index.ts, index.test.ts, input.txt, README.md.

```sh
yarn add:day 3
```
