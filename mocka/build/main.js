import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

console.log('Building screenshots...');

// Traverse the directory and build an array of URLs
const librariesPath = 'libraries';
const libraryNames = fs.readdirSync(librariesPath);

const urls = [];
const components = [];

function generateJSONFile() {
  const outputPath = path.join(process.cwd(), 'src', 'component-list.json');
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 4));
  console.log('JSON file saved at', outputPath);
}

for (const libraryName of libraryNames) {
  const groupsPath = path.join(librariesPath, libraryName);
  const groupNames = fs.readdirSync(groupsPath);

  for (const groupName of groupNames) {
    const componentsPath = path.join(groupsPath, groupName);
    const componentFiles = fs.readdirSync(componentsPath);

    for (const componentFile of componentFiles) {
      const componentName = path.basename(componentFile, '.astro');
      const url = `http://127.0.0.1:3000/preview/${libraryName}/${groupName}/${componentName}`;
      urls.push(url);

      components.push({
        library: libraryName,
        group: groupName,
        name: componentName,
      });
    }
  }
}

generateJSONFile();


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
  await page.setViewport({ width: 1440, height: 1080 });
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

    // Get the library, group, and component name from the URL
    const urlSegments = url.split('/');
    const libraryName = urlSegments[4];
    const groupName = urlSegments[5];
    const componentName = urlSegments[6];

    // Create the output path
    const groupOutputPath = path.join(outputDirectory, libraryName, groupName);

    if (!fs.existsSync(groupOutputPath)) {
      fs.mkdirSync(groupOutputPath, { recursive: true });
    }

    const imagePath = path.join(groupOutputPath, `${componentName}.webp`);
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
