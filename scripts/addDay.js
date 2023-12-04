// create next numerical day folder following the sequence day1, day2, day3, etc. in the root of this project
// create the files README.md, input.txt, index.ts and index.test.ts

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const day = process.argv[2];

if (!day) {
  console.error('Please provide a day number');
  process.exit(1);
}

const dayFolder = `day${day}`;
const dayFolderPath = path.join(__dirname, '..', dayFolder);

if (fs.existsSync(dayFolderPath)) {
  console.error(`Folder ${dayFolder} already exists`);
  process.exit(1);
}

fs.mkdirSync(dayFolderPath);

const files = ['README.md', 'input.txt', 'index.ts', 'index.test.ts'];

files.forEach((file) => {
  fs.writeFileSync(path.join(dayFolderPath, file), '');
});

exec(`git add ${dayFolder}`);

console.log(`Folder ${dayFolder} created`);

process.exit(0);
