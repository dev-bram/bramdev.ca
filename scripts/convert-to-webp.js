const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Large SVG logos that would benefit from WebP conversion
const svgsToConvert = [
  'nextjs.svg',
  'flask.svg',
  'supabase.svg',
  'xaml.svg',
  'vercel.svg'
];

async function convertSvgToWebP() {
  console.log('Converting large SVG logos to WebP...\n');

  for (const svgFile of svgsToConvert) {
    const svgPath = path.join(publicDir, svgFile);
    const webpPath = path.join(publicDir, svgFile.replace('.svg', '.webp'));

    if (!fs.existsSync(svgPath)) {
      console.log(`⚠️  ${svgFile} not found, skipping...`);
      continue;
    }

    try {
      await sharp(svgPath)
        .resize(300, 300, { // Resize to display size (2x for retina)
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 85, alphaQuality: 100 })
        .toFile(webpPath);

      const svgSize = fs.statSync(svgPath).size;
      const webpSize = fs.statSync(webpPath).size;
      const savings = ((1 - webpSize / svgSize) * 100).toFixed(1);

      console.log(`✓ ${svgFile} → ${path.basename(webpPath)}`);
      console.log(`  Size: ${(svgSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% reduction)\n`);
    } catch (error) {
      console.error(`✗ Failed to convert ${svgFile}:`, error.message, '\n');
    }
  }

  console.log('WebP conversion complete!');
}

convertSvgToWebP().catch(console.error);
