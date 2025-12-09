#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, '../public/images-backup');

// Configuration
const CONFIG = {
  // Maximum width for images (height will be proportional)
  maxWidth: 1920,
  // Quality settings (0-100)
  jpegQuality: 80,
  pngQuality: 80,
  webpQuality: 80,
  // Minimum file size to optimize (in bytes) - skip small files
  minSizeToOptimize: 50 * 1024, // 50KB
};

let totalOriginalSize = 0;
let totalOptimizedSize = 0;
let processedCount = 0;
let skippedCount = 0;

async function getAllImageFiles(dir) {
  const files = [];
  const items = await readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Recursively get files from subdirectories
      const subFiles = await getAllImageFiles(fullPath);
      files.push(...subFiles);
    } else if (item.isFile()) {
      const ext = path.extname(item.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;

    // Skip small files
    if (originalSize < CONFIG.minSizeToOptimize) {
      skippedCount++;
      return { skipped: true, reason: 'too small' };
    }

    const ext = path.extname(filePath).toLowerCase();
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if wider than maxWidth
    let pipeline = image;
    if (metadata.width && metadata.width > CONFIG.maxWidth) {
      pipeline = pipeline.resize(CONFIG.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // Apply format-specific optimization
    let buffer;
    if (ext === '.png') {
      buffer = await pipeline
        .png({ quality: CONFIG.pngQuality, compressionLevel: 9 })
        .toBuffer();
    } else if (ext === '.webp') {
      buffer = await pipeline
        .webp({ quality: CONFIG.webpQuality })
        .toBuffer();
    } else {
      // Default to JPEG optimization for .jpg, .jpeg
      buffer = await pipeline
        .jpeg({ quality: CONFIG.jpegQuality, progressive: true })
        .toBuffer();
    }

    const optimizedSize = buffer.length;

    // Only save if we actually reduced the size
    if (optimizedSize < originalSize) {
      // Write directly to the same file
      await sharp(buffer).toFile(filePath + '.tmp');
      const { rename, unlink } = await import('fs/promises');
      await unlink(filePath);
      await rename(filePath + '.tmp', filePath);

      totalOriginalSize += originalSize;
      totalOptimizedSize += optimizedSize;
      processedCount++;

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`✓ ${path.relative(IMAGES_DIR, filePath)}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (-${savings}%)`);

      return { optimized: true, originalSize, optimizedSize };
    } else {
      skippedCount++;
      return { skipped: true, reason: 'no size reduction' };
    }
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message);
    return { error: true, message: error.message };
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  console.log(`Source directory: ${IMAGES_DIR}`);
  console.log(`Max width: ${CONFIG.maxWidth}px`);
  console.log(`JPEG quality: ${CONFIG.jpegQuality}%`);
  console.log(`PNG quality: ${CONFIG.pngQuality}%`);
  console.log(`Min size to optimize: ${formatBytes(CONFIG.minSizeToOptimize)}\n`);

  try {
    // Get all image files
    console.log('Scanning for images...');
    const imageFiles = await getAllImageFiles(IMAGES_DIR);
    console.log(`Found ${imageFiles.length} images\n`);

    // Process each image
    console.log('Optimizing images...\n');
    for (const filePath of imageFiles) {
      await optimizeImage(filePath);
    }

    // Summary
    console.log('\n============================');
    console.log('📊 Summary');
    console.log('============================');
    console.log(`Total images found: ${imageFiles.length}`);
    console.log(`Optimized: ${processedCount}`);
    console.log(`Skipped: ${skippedCount}`);

    if (processedCount > 0) {
      const totalSavings = totalOriginalSize - totalOptimizedSize;
      const savingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
      console.log(`\nOriginal size: ${formatBytes(totalOriginalSize)}`);
      console.log(`Optimized size: ${formatBytes(totalOptimizedSize)}`);
      console.log(`Total saved: ${formatBytes(totalSavings)} (${savingsPercent}%)`);
    }

    console.log('\n✅ Optimization complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
