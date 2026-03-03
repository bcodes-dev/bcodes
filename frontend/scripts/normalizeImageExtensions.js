const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

function normalizeExtensions(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      normalizeExtensions(fullPath);
    } else {
      const ext = path.extname(entry.name);
      const lowerExt = ext.toLowerCase();
      if (ext !== lowerExt) {
        const newPath = path.join(dir, path.basename(entry.name, ext) + lowerExt);
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed: ${entry.name} → ${path.basename(newPath)}`);
      }
    }
  }
}

normalizeExtensions(imagesDir);
console.log('Image extension normalization complete.');
