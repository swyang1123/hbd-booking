/**
 * PNG에서 흰색(및 아주 밝은 톤) 픽셀을 투명하게 만듦.
 * 사용: node scripts/remove-white-bg.mjs
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, "../public/images/bicolor_sapphire.png");
const outputPath = join(__dirname, "../public/images/bicolor_sapphire.png");

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const threshold = 242; // 이 값 이상이면 흰색으로 보고 투명 처리 (배경 완전 제거)

for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = channels === 4 ? data[i + 3] : 255;
  if (r >= threshold && g >= threshold && b >= threshold && a > 0) {
    data[i + 3] = 0; // alpha = 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log("Done: white areas made transparent in", outputPath);
