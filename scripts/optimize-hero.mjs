/**
 * Hero Background SVG Optimizer
 * 
 * hero-back.svg is 2.5MB with an embedded 1536x1024 PNG.
 * Resizes the embedded image to 768x512 (half resolution) 
 * and re-encodes as WebP for dramatic size reduction.
 */

import sharp from 'sharp'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const PUBLIC_IMAGES = join(import.meta.dirname, '..', 'public', 'images')
const SOURCE_IMAGES = join(import.meta.dirname, '..', 'Image', 'asset')

const paths = [
  join(PUBLIC_IMAGES, 'hero-back.svg'),
  join(SOURCE_IMAGES, 'hero-back.svg'),
].filter(p => existsSync(p))

for (const filePath of paths) {
  const content = readFileSync(filePath, 'utf-8')
  const originalSize = readFileSync(filePath).length

  const base64Match = content.match(/data:image\/png;base64,([A-Za-z0-9+/=\s]+)/)
  if (!base64Match) {
    console.log(`⚠️  ${filePath}: no embedded PNG data`)
    continue
  }

  const originalPng = Buffer.from(base64Match[1].replace(/\s/g, ''), 'base64')

  // Resize to half resolution and convert to WebP
  const resized = await sharp(originalPng)
    .resize(768, 512, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer()

  const newBase64 = resized.toString('base64')

  // Extract viewBox from original
  const viewBoxMatch = content.match(/viewBox="([^"]*)"/)
  const widthMatch = content.match(/width="(\d+)"/)
  const heightMatch = content.match(/height="(\d+)"/)

  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 1536 1024'
  const width = widthMatch ? widthMatch[1] : '1536'
  const height = heightMatch ? heightMatch[1] : '1024'

  const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}" fill="none">
<image width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" href="data:image/webp;base64,${newBase64}"/>
</svg>`

  const newSize = Buffer.byteLength(cleanSvg, 'utf-8')
  writeFileSync(filePath, cleanSvg, 'utf-8')
  
  console.log(`✅ hero-back.svg: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newSize / 1024).toFixed(0)}KB (saved ${((originalSize - newSize) / 1024 / 1024).toFixed(1)}MB)`)
}
