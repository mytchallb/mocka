import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

console.log("Building screenshots...");

// Traverse the directory and build an array of URLs
const librariesPath = "libraries";
const libraryNames = fs.readdirSync(librariesPath);

const urls = [];
const components = [];

function generateJSONFile() {
  const outputPath = path.join(process.cwd(), "src", "component-list.json");
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 4));
  console.log("JSON file saved at", outputPath);
}

async function applyComponentSettings(
  page,
  libraryName,
  groupName,
  componentName
) {
  const settingsPath = path.join(librariesPath, libraryName, "settings.json");
  console.log("settingsPath", settingsPath);
  if (fs.existsSync(settingsPath)) {
    console.log("settingsPath", settingsPath);
    const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
    const matchingSetting = settings[groupName.toLowerCase()]?.find(
      (setting) => setting.name.toLowerCase() === componentName.toLowerCase()
    );
    console.log("matchingSetting", matchingSetting);
    if (matchingSetting) {
      const { div_width, div_height, screenshot_width, screenshot_height } =
        matchingSetting;
      if (div_width && div_height) {
        await page.addStyleTag({
          content: `.center { padding:2px; width: ${div_width}px; height: ${div_height}px; display: flex; align-items: center; justify-content: center; }`,
        });
        await page.evaluate(() => {
          const mainElement = document.querySelector("#main");
          const container = document.createElement("div");
          container.className = "center";
          mainElement.parentNode.insertBefore(container, mainElement);
          container.appendChild(mainElement);
        });
      }
      return { screenshot_width, screenshot_height };
    }
  }
  return null;
}

for (const libraryName of libraryNames) {
  const groupsPath = path.join(librariesPath, libraryName);
  const stat = fs.statSync(groupsPath);

  //Check to ensure you're only processing directories
  if (!stat.isDirectory()) {
    continue;
  }
  const groupNames = fs.readdirSync(groupsPath);

  for (const groupName of groupNames) {
    const componentsPath = path.join(groupsPath, groupName);
    const stat = fs.statSync(componentsPath);

    // Add this check to ensure you're only processing directories
    if (!stat.isDirectory()) {
      continue;
    }

    const componentFiles = fs.readdirSync(componentsPath);

    for (const componentFile of componentFiles) {
      const componentName = path.basename(componentFile, ".astro");
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

const replace = process.argv.includes("replace");
const darkMode = process.argv.includes("dark");

let createdCount = 0;
let skippedCount = 0;

(async () => {
  // Check if the 'public/component-previews' folder exists and create it if it doesn't
  const outputDirectory = path.join(process.cwd(), "public/component-previews");
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Launch a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport size
  await page.setViewport({ width: 1440, height: 1080 });
  if (darkMode)
    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: "dark" },
    ]);

  // Loop through the URLs
  for (const url of urls) {
    // Get the library, group, and component name from the URL
    const urlSegments = url.split("/");
    const libraryName = urlSegments[4];
    const groupName = urlSegments[5];
    const componentName = urlSegments[6];

    // Create the output path
    const groupOutputPath = path.join(outputDirectory, libraryName, groupName);

    const imagePath = path.join(groupOutputPath, `${componentName}.jpeg`);
    // console.log(`Image path: ${imagePath}`);

    if (!replace && fs.existsSync(imagePath)) {
      // console.log(`Skipping ${imagePath}`);
      skippedCount++;
      continue;
    }

    // Navigate to the webpage
    await page.goto(url);

    // Wait for the component to load
    await page.waitForSelector("#main");

    // Get the bounding box of the component you want to capture
    const component = await page.$("#main");
    const boundingBox = await component.boundingBox();

    // Set the viewport size to match the component size
    // await page.setViewport({
    //   width: Math.ceil(boundingBox.width),
    //   height: Math.ceil(boundingBox.height),
    // });

    // console.log(boundingBox);

    // Apply settings from the settings.json file
    const settings = await applyComponentSettings(
      page,
      libraryName,
      groupName,
      componentName
    );

    if (!fs.existsSync(groupOutputPath)) {
      fs.mkdirSync(groupOutputPath, { recursive: true });
    }

    await page.screenshot({
      path: imagePath,
      type: "jpeg",
      clip: {
        x: boundingBox.x,
        y: boundingBox.y,
        width:
          settings?.screenshot_width ??
          (boundingBox.width > 0 ? boundingBox.width : 1920),
        height:
          settings?.screenshot_height ??
          (boundingBox.height > 0 ? boundingBox.height : 1080),
      },
    });
    createdCount++;
    console.log(`Image saved at ${imagePath}`);
  }

  // Close the browser
  await browser.close();

  console.log("\u001b[32m", `Total images created: ${createdCount}`);
  if (skippedCount)
    console.log("\u001b[0m", `Total images skipped: ${skippedCount}`);
})();
