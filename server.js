// Server that serves static files and injects environment variables
require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // For SPA, serve index.html for any route
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
          }
        });
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      // Inject environment variables into JavaScript files
      if (ext === '.js') {
        let jsContent = content.toString();
        
        // Replace CONFIG object with environment variables
        jsContent = jsContent.replace(
          /CONFIG\s*=\s*\{[^}]*\}/,
          `CONFIG = {
            API_KEY: '${process.env.API_KEY || ''}',
            BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
            UNITS: 'metric'
          }`
        );
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(jsContent);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});