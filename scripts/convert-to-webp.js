const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const IMAGES_DIR = path.join(__dirname, "../public/images");
const QUALITY = { png: 85, jpg: 82, jpeg: 82 };

function walkDir(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walkDir(full));
    else results.push(full);
  }
  return results;
}

async function convert() {
  const files = walkDir(IMAGES_DIR).filter((f) =>
    /\.(png|jpe?g)$/i.test(f)
  );

  let savedBytes = 0;
  let count = 0;

  for (const src of files) {
    const ext = path.extname(src).slice(1).toLowerCase();
    const dest = src.replace(/\.(png|jpe?g)$/i, ".webp");

    if (fs.existsSync(dest)) {
      // Already converted — just delete the original
      const origSize = fs.statSync(src).size;
      fs.unlinkSync(src);
      savedBytes += origSize;
      count++;
      continue;
    }

    const origSize = fs.statSync(src).size;
    const q = QUALITY[ext] ?? 82;

    try {
      await sharp(src).webp({ quality: q }).toFile(dest);
      const newSize = fs.statSync(dest).size;
      savedBytes += origSize - newSize;
      fs.unlinkSync(src);
      count++;
      console.log(
        `  ${path.relative(IMAGES_DIR, src).padEnd(60)} ${(origSize / 1024).toFixed(0).padStart(6)} KB → ${(newSize / 1024).toFixed(0).padStart(6)} KB`
      );
    } catch (e) {
      console.error(`  FAILED: ${src} — ${e.message}`);
    }
  }

  console.log(
    `\nDone: ${count} files, saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB`
  );
}

convert();
