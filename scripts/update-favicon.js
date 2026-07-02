const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateFavicon() {
  const logoPath = path.resolve(__dirname, '../public/logo.png');
  const iconPath = path.resolve(__dirname, '../app/icon.png');
  const faviconPath = path.resolve(__dirname, '../app/favicon.ico');

  if (!fs.existsSync(logoPath)) {
    console.error('Error: public/logo.png not found!');
    process.exit(1);
  }

  console.log('Found public/logo.png. Processing...');

  // 1. Create a high-res square icon.png (512x512)
  await sharp(logoPath)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(iconPath + '.temp');

  // Replace original app/icon.png
  fs.renameSync(iconPath + '.temp', iconPath);
  console.log('Successfully updated app/icon.png');

  // 2. Create a 32x32 favicon.ico
  await sharp(logoPath)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile(faviconPath + '.temp');

  // Replace original app/favicon.ico
  fs.renameSync(faviconPath + '.temp', faviconPath);
  console.log('Successfully updated app/favicon.ico');
}

generateFavicon().catch(err => {
  console.error('Error generating favicon:', err);
  process.exit(1);
});
