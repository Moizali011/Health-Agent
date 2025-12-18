const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3009;

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain'
};

// Function to handle requests
const handleRequest = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Default to index.html if root path is requested
  let filePath = req.url === '/' ? '/index.html' : req.url;

  // Resolve the file path
  filePath = path.join(process.cwd(), 'fitness-coach-app', filePath);

  // Get the file extension
  const extname = path.extname(filePath).toLowerCase();

  // Get the content type based on file extension
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found - serve index.html for SPA routing
        const indexPath = path.join(process.cwd(), 'fitness-coach-app', 'index.html');
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (indexErr) {
            // If index.html doesn't exist, return 404
            res.writeHead(404);
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - serve the requested file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
};

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`\nAI Fitness Coach Dashboard server running at http://${hostname}:${port}/`);
  console.log(`\nTo view the dashboard:`);
  console.log(`1. Open your browser`);
  console.log(`2. Navigate to http://${hostname}:${port}/`);
  console.log(`\nPress Ctrl+C to stop the server`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});