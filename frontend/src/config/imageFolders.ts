// This file dynamically loads a generated JSON index if available.
// A build-time script (`scripts/generateImageFolders.js`) writes
// `src/config/imageFolders.auto.json` based on `public/images`.

let data: { Image_Folders: any[] } | null = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  data = require('./imageFolders.auto.json');
} catch (e) {
  data = null;
}

export const Image_Folders = (data && data.Image_Folders) || [];
