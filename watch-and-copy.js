/*
  This script exists to make developing locally easier. When run it sets up a watcher that outputs files into the given dir (which you should set to the foundry dir ofc)
*/

const fs = require("fs");
const chokidar = require("chokidar");
const path = require("path");

// Read command line arguments for source and destination directories
const [, , srcDir = "./", destDir] = process.argv;

if (!destDir) {
  console.error(
    "Please provide a destination directory. This should be the directory inside your local foundry modules. eg. C://Users/{YOUR NAME}/AppData/Local/FoundryVTT/Data/modules/maru-combat-themes"
  );
  process.exit(1);
}

if (!fs.existsSync(srcDir)) {
  console.error(`Didn't find the src directory ${srcDir}. Ensure its valid!`);
  process.exit(1);
}

if (!fs.existsSync(destDir)) {
  console.error(
    `Didn't find the destination directory ${destDir}. Ensure its valid!`
  );
  process.exit(1);
}

const watcher = chokidar.watch(srcDir, { ignoreInitial: true });

watcher.on("add", (filePath) => {
  const fileName = path.basename(filePath);
  const destPath = path.join(destDir, filePath);
  console.log(`File ${filePath} added, copying to ${destPath}...`);
  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      console.error(`Error copying file ${fileName}: ${err}`);
    } else {
      console.log(`File ${fileName} copied successfully.`);
    }
  });
});

watcher.on("change", (filePath) => {
  const fileName = path.basename(filePath);
  const destPath = path.join(destDir, filePath);
  console.log(`File ${filePath} changed, copying to ${destPath}...`);
  fs.copyFile(filePath, destPath, (err) => {
    if (err) {
      console.error(`Error copying file ${fileName}: ${err}`);
    } else {
      console.log(`File ${fileName} copied successfully.`);
    }
  });
});

watcher.on("unlink", (filePath) => {
  const fileName = path.basename(filePath);
  const destPath = path.join(destDir, filePath);
  console.log(
    `File ${filePath} removed from watch, deleting from ${destPath}...`
  );
  fs.unlink(destPath, (err) => {
    if (err) {
      console.error(`Error deleting file ${fileName}: ${err}`);
    } else {
      console.log(`File ${fileName} deleted successfully.`);
    }
  });
});

console.log(`Watching for changes to files in ${srcDir}...`);
console.log(`Copying files to ${destDir}...`);
