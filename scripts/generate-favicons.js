const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const FAVICON_SIZES = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'mstile-150x150.png': 150
};

const SOURCE_SVG = path.join(__dirname, '../public/favicon/favicon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public/favicon');

async function generateFavicons() {
  try {
    // Убедимся, что директория существует
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Читаем SVG файл
    const svgBuffer = fs.readFileSync(SOURCE_SVG);

    // Генерируем каждый размер
    for (const [filename, size] of Object.entries(FAVICON_SIZES)) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(OUTPUT_DIR, filename));
      
      console.log(`Generated ${filename} (${size}x${size}px)`);
    }

    console.log('All favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons(); 