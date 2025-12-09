import { NextRequest, NextResponse } from 'next/server';
import { readFile, stat, readdir } from 'fs/promises';
import path from 'path';

// Get the base directory for public files
const getPublicDir = () => {
  // In standalone mode, public folder is at the same level as server.js
  const cwd = process.cwd();
  return path.join(cwd, 'public');
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: pathSegments } = await params;
    const fileName = pathSegments.join('/');

    // Sanitize the path to prevent directory traversal
    const sanitizedFileName = fileName.replace(/\.\./g, '').replace(/^\/+/, '');

    // Try multiple possible paths for the video
    const possiblePaths = [
      path.join(getPublicDir(), 'video', sanitizedFileName),
      path.join(process.cwd(), 'public', 'video', sanitizedFileName),
      path.join(process.cwd(), '..', 'public', 'video', sanitizedFileName),
    ];

    let filePath: string | null = null;

    // Find the first path that exists
    for (const tryPath of possiblePaths) {
      try {
        await stat(tryPath);
        filePath = tryPath;
        break;
      } catch {
        // Try next path
      }
    }

    if (!filePath) {
      // List available files for debugging
      let availableFiles: string[] = [];
      for (const tryPath of possiblePaths) {
        const videoDir = path.dirname(tryPath);
        try {
          const files = await readdir(videoDir);
          availableFiles = files;
          break;
        } catch {
          // Directory doesn't exist
        }
      }

      console.error('Video not found. Tried paths:', possiblePaths);
      console.error('CWD:', process.cwd());
      console.error('Requested file:', sanitizedFileName);
      console.error('Available files:', availableFiles);

      return NextResponse.json({
        error: 'File not found',
        requested: sanitizedFileName,
        availableFiles,
        cwd: process.cwd(),
      }, { status: 404 });
    }

    // Read the file
    const fileBuffer = await readFile(filePath);

    // Determine content type based on extension
    const ext = path.extname(filePath).toLowerCase();
    const contentTypes: Record<string, string> = {
      '.mp4': 'video/mp4',
      '.webm': 'video/webm',
      '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo',
      '.mkv': 'video/x-matroska',
    };

    const contentType = contentTypes[ext] || 'application/octet-stream';
    const baseName = path.basename(filePath);

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const uint8Array = new Uint8Array(fileBuffer);

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${baseName}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error serving video:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
