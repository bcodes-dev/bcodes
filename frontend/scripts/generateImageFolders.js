const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const outFile = path.join(__dirname, '..', 'src', 'config', 'imageFolders.auto.json');

function isImageFile(name) {
  return /\.(jpe?g|png|gif|webp|svg|bmp|tiff)$/i.test(name);
}

if (!fs.existsSync(imagesDir)) {
  console.error('Images directory not found:', imagesDir);
  process.exit(0);
}

const entries = fs.readdirSync(imagesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  // sort directories by name descending so latest YYYY-MM-DD are first
  .sort((a, b) => String(b.name).localeCompare(String(a.name)))
  .map((dir) => {
    const folderPath = path.join(imagesDir, dir.name);
    let files = [];
    try {
      files = fs.readdirSync(folderPath).filter(isImageFile).sort();
    } catch (e) {
      files = [];
    }

    // Format label from YYYY-MM-DD to "Month D, YYYY" when possible
    let label = dir.name;
    const match = /^\d{4}-\d{2}-\d{2}$/.test(dir.name);
    if (match) {
      try {
        const d = new Date(dir.name);
        // Use toLocaleDateString for a nice human label
        label = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      } catch (e) {
        label = dir.name;
      }
    }

    return {
      id: dir.name,
      label,
      path: `/images/${dir.name}`,
      imageCount: files.length,
    };
  });

const out = { Image_Folders: entries };

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
console.log('Generated', outFile);
