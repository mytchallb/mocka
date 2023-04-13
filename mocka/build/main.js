// screenshot.js
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

console.log('Building screenshots...');

// Traverse the directory and build an array of URLs
const librariesPath = 'libraries';
const groups = fs.readdirSync(librariesPath);

const urls = [];

for (const group of groups) {
  const componentsPath = path.join(librariesPath, group);
  const components = fs.readdirSync(componentsPath);

  for (const component of components) {
    const url = `http://127.0.0.1:3000/preview/${group}/${path.basename(component, '.astro')}`;
    // console.log("checking url: ", url);
    urls.push(url);
  }
}

const replace = process.argv.includes('replace');
const darkMode = process.argv.includes('dark');

let createdCount = 0;
let skippedCount = 0;

(async () => {
  // Check if the 'public/component-previews' folder exists and create it if it doesn't
  const outputDirectory = path.join(process.cwd(), 'public/component-previews');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1920, height: 1080 });
  if (darkMode) await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Loop through the URLs
  for (const url of urls) {
    // Navigate to the webpage
    await page.goto(url);

    // Wait for the component to load
    await page.waitForSelector('#main');

    // Get the bounding box of the component you want to capture
    const component = await page.$('#main');
    const boundingBox = await component.boundingBox();

    // console.log(boundingBox);

    // Take a screenshot of the component
    const groupName = url.split('/')[5];
    const fileName = path.basename(url).split('/').pop() + '.webp';
    const groupOutputPath = path.join(outputDirectory, groupName);

    if (!fs.existsSync(groupOutputPath)) {
      fs.mkdirSync(groupOutputPath);
    }

    const imagePath = path.join(groupOutputPath, fileName);

    // console.log(`Image path: ${imagePath}`);

    if (!replace && fs.existsSync(imagePath)) {
      // console.log(`Skipping ${imagePath}`);
      skippedCount++;
      continue;
    }

    await page.screenshot({
      path: imagePath,
      type: 'webp',
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width: boundingBox.width,
        height: boundingBox.height,
      },
    });
    createdCount++;
    //console.log(`Image saved at ${imagePath}`);
  }

  // Close the browser
  await browser.close();

console.log('\u001b[32m',`Total images created: ${createdCount}`);
if (skippedCount) console.log('\u001b[0m',`Total images skipped: ${skippedCount}`);
})();
