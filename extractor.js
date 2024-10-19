import fs from "fs";
import path from "path";

function findFiles(dir) {
  const ret = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      ret.push(...findFiles(fullPath));
    } else {
      ret.push(fullPath);
    }
  }

  return ret;
}

const dir = "D:/code/misc/godot/webfishing-decomp";
const out = "./src/game";
const iconsDir = "./public/icons";
if (!fs.existsSync(out)) fs.mkdirSync(out);
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir);

const files = findFiles(path.join(dir, "Resources"));
const itemResource = "res://Resources/Scripts/item_resource.gd";
const cosmeticResource = "res://Resources/Scripts/cosmetic_resource.gd";

const cats = {
  item: [],
  cosmetic: []
};
const subcats = {};

for (const file of files) {
  const id = path.basename(file, ".tres");
  if (!file.endsWith(".tres")) continue;
  const content = fs.readFileSync(file, "utf8");

  let type = null;
  if (content.includes(itemResource)) {
    type = "item";
  } else if (content.includes(cosmeticResource)) {
    type = "cosmetic";
  }

  if (!type) continue;

  const category = content.match(/category = "([^"]+)"/)?.[1];
  if (!category) continue;

  const name = content.match(/name = "([^"]+)"/)?.[1];
  if (!name) continue;

  const iconId = content.match(/icon = ExtResource\( (\d+) \)/)?.[1];
  if (!iconId) continue;

  let iconPath = content
    .split("\n")
    .find((line) => line.includes(`id=${iconId.trim()}`))
    .match(/path="([^"]+)"/)?.[1];
  if (!iconPath) continue;

  iconPath = iconPath.replace("res://", "");
  const iconFileName = path.basename(iconPath);
  fs.copyFileSync(path.join(dir, iconPath), path.join(iconsDir, iconFileName));

  if (!cats[type].includes(category)) {
    cats[type].push(category);
  }

  if (!subcats[category]) {
    subcats[category] = {};
  }

  subcats[category][id] = {
    name,
    category,
    icon: iconFileName
  };
}

let output = `
// auto generated with extractor.js
import type { Things } from "./types";

`;

for (const category in subcats) {
  output += `const ${category}: Things = ${JSON.stringify(subcats[category])};\n\n`;
}

output += "\n\n";

for (const type in cats) {
  output += `export const ${type}s: Things = {\n`;
  for (const cat of cats[type]) {
    output += `  ...${cat},\n`;
  }
  output += "};\n\n";
}

output += `const all = { ...items, ...cosmetics };\n`;
output += `export default all;`;

fs.writeFileSync(path.join(out, "things.ts"), output);
