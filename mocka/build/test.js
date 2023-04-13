import fs from 'fs';

console.log('Running screenshot.js...');

// Traverse the directory and build an array of URLs
const librariesPath = 'libraries';
const groups = fs.readdirSync(librariesPath);

console.log(groups);