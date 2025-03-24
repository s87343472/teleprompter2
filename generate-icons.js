const fs = require('fs');
const sharp = require('sharp');

// SVG内容
const svgContent = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background rectangle -->
  <rect width="512" height="512" rx="64" fill="#000000" />

  <!-- Teleprompter screen -->
  <rect x="96" y="96" width="320" height="320" rx="32" fill="#FFFFFF" />

  <!-- Orange indicator line -->
  <rect x="96" y="224" width="320" height="64" fill="#FF5C00" />

  <!-- T.P letters -->
  <path d="M176 176H256V208H232V336H200V208H176V176Z" fill="#000000" />
  <path
    d="M272 176H336C352 176 368 192 368 208V240C368 256 352 272 336 272H304V336H272V176ZM304 208V240H336V208H304Z"
    fill="#000000"
  />
</svg>`;

// 生成各种尺寸的图标
async function generateIcons() {
  // 保存高分辨率SVG
  fs.writeFileSync('./public/icon.svg', svgContent);

  // 尺寸数组
  const sizes = [16, 32, 64, 128, 180, 192, 512];

  // 生成不同尺寸的PNG
  for (const size of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(`./public/icon-${size}.png`);
    
    console.log(`Generated icon-${size}.png`);
  }

  // 为不同用途创建特定文件名
  fs.copyFileSync('./public/icon-32.png', './public/icon.png');
  fs.copyFileSync('./public/icon-16.png', './public/favicon.ico');
  fs.copyFileSync('./public/icon-180.png', './public/apple-icon.png');

  console.log('Icon generation complete!');
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
}); 