/**
 * Social Icon Optimizer
 * 
 * These SVGs contain 2500x2500px base64-encoded PNGs but are displayed at 16-28px.
 * This script:
 * 1. Extracts the embedded PNG from each SVG
 * 2. Resizes it to 64x64px (4x display density for retina, plenty for 16-28px display)
 * 3. Re-embeds the tiny PNG back into a clean SVG
 * 
 * Expected savings: ~90MB → ~50KB total
 */

import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, basename } from 'path'

const PUBLIC_IMAGES = join(import.meta.dirname, '..', 'public', 'images')
const SOURCE_IMAGES = join(import.meta.dirname, '..', 'Image', 'asset')

const SOCIAL_SVGS = ['Facebook.svg', 'Instagram.svg', 'LinkedIn.svg', 'Twitter.svg', 'Youtube.svg']

// Target size: 64x64px is 4x density for 16px display (retina-ready)
const TARGET_SIZE = 64

let totalSaved = 0

for (const filename of SOCIAL_SVGS) {
  const paths = [
    join(PUBLIC_IMAGES, filename),
    join(SOURCE_IMAGES, filename),
  ].filter(p => existsSync(p))

  if (paths.length === 0) {
    console.log(`⏭️  ${filename}: not found, skipping`)
    continue
  }

  // Read from first available path
  const content = readFileSync(paths[0], 'utf-8')
  const originalSize = readFileSync(paths[0]).length
  
  // Extract base64 PNG
  const base64Match = content.match(/data:image\/png;base64,([A-Za-z0-9+/=\s]+)/)
  if (!base64Match) {
    console.log(`⚠️  ${filename}: no embedded PNG data found`)
    continue
  }

  // Decode and resize with sharp
  const originalPng = Buffer.from(base64Match[1].replace(/\s/g, ''), 'base64')
  
  const resizedPng = await sharp(originalPng)
    .resize(TARGET_SIZE, TARGET_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 80, compressionLevel: 9 })
    .toBuffer()

  const newBase64 = resizedPng.toString('base64')

  // Create clean minimal SVG
  const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TARGET_SIZE}" height="${TARGET_SIZE}" viewBox="0 0 ${TARGET_SIZE} ${TARGET_SIZE}" fill="none">
<image width="${TARGET_SIZE}" height="${TARGET_SIZE}" href="data:image/png;base64,${newBase64}"/>
</svg>`

  const newSize = Buffer.byteLength(cleanSvg, 'utf-8')
  const saved = originalSize - newSize

  // Write to all locations
  for (const p of paths) {
    writeFileSync(p, cleanSvg, 'utf-8')
  }

  totalSaved += saved * paths.length
  console.log(`✅ ${filename}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024).toFixed(1)}KB (saved ${(saved / 1024 / 1024).toFixed(1)}MB)`)
}

// Also optimize hero-back.svg if it's large
const heroBack = join(PUBLIC_IMAGES, 'hero-back.svg')
if (existsSync(heroBack)) {
  const heroContent = readFileSync(heroBack, 'utf-8')
  const heroSize = readFileSync(heroBack).length
  if (heroSize > 500_000) {
    console.log(`\n⚠️  hero-back.svg is ${(heroSize / 1024 / 1024).toFixed(1)}MB — consider optimizing separately`)
  }
}

// Optimize Login Art PNG
const loginArtPath = join(SOURCE_IMAGES, 'Login Art.png')
if (existsSync(loginArtPath)) {
  const originalSize = readFileSync(loginArtPath).length
  
  // Resize to max 1200px wide and convert to high-quality WebP
  const webpPath = join(SOURCE_IMAGES, 'Login Art.webp')
  
  await sharp(loginArtPath)
    .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath)

  const newSize = readFileSync(webpPath).length
  const saved = originalSize - newSize
  totalSaved += saved

  console.log(`\n✅ Login Art: ${(originalSize / 1024 / 1024).toFixed(1)}MB PNG → ${(newSize / 1024).toFixed(0)}KB WebP (saved ${(saved / 1024 / 1024).toFixed(1)}MB)`)
}

console.log(`\n📊 Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)}MB`)
