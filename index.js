const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Path to the count file
const COUNT_FILE = path.join(__dirname, 'count.txt');

// Create the server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/count') {
    // Check if the count file exists
    if (!fs.existsSync(COUNT_FILE)) {
      // If the file doesn't exist, create it with an initial count of 0
      fs.writeFileSync(COUNT_FILE, '0');
    }

    // Read the current count from the file
    let count = fs.readFileSync(COUNT_FILE, 'utf-8').trim();

    // Parse the count and handle invalid or empty content
    count = parseInt(count, 10);
    if (isNaN(count)) {
      count = 0; // Default to 0 if invalid
    }

    // Increment the count
    count += 1;

    // Write the updated count back to the file
    fs.writeFileSync(COUNT_FILE, count.toString());

    // Set the response headers and send the updated count
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count }));
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
