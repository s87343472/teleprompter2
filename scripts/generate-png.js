const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertSvgToPng(svgPath, pngPath, width, height) {
  try {
    console.log(`Converting ${svgPath} to ${pngPath}...`);
    const svg = fs.readFileSync(svgPath);
    
    await sharp(svg)
      .resize(width, height)
      .png()
      .toFile(pngPath);
    
    console.log(`Successfully created ${pngPath}`);
  } catch (error) {
    console.error(`Error converting ${svgPath} to PNG:`, error);
  }
}

async function main() {
  // 定义转换任务
  const tasks = [
    {
      svg: path.join(__dirname, '../public/og-image.svg'),
      png: path.join(__dirname, '../public/og-image.png'),
      width: 1200,
      height: 630
    },
    {
      svg: path.join(__dirname, '../public/twitter-card.svg'),
      png: path.join(__dirname, '../public/twitter-card.png'),
      width: 1200,
      height: 600
    }
  ];

  // 执行所有转换任务
  for (const task of tasks) {
    await convertSvgToPng(task.svg, task.png, task.width, task.height);
  }
}

main().catch(console.error); 