const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3009;

const server = http.createServer((req, res) => {
    let filePath = req.url;

    // Default to index.html if root path is requested
    if (filePath === '/') {
        filePath = '/index.html';
    }

    // Construct the full file path
    const fullPath = path.join(process.cwd(), 'fitness-coach-app', filePath);

    // Determine the content type based on file extension
    const extname = path.extname(fullPath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                console.error(`File not found: ${fullPath}`);
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                // Server error
                console.error(`Server error: ${err.code}`);
                res.writeHead(500);
                res.end('500 Internal Server Error');
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`\nAI Fitness Coach Dashboard server running at http://${hostname}:${port}/`);
    console.log(`\nTo view the dashboard:`);
    console.log(`1. Open your browser`);
    console.log(`2. Navigate to http://${hostname}:${port}/`);
    console.log(`\nPress Ctrl+C to stop the server`);
});