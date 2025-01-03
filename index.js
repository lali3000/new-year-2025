const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Path to the count file
const COUNT_FILE = path.join(__dirname, 'count.txt');

// Enable CORS
app.use(cors());

// Route to handle the /count endpoint
app.get('/count', (req, res) => {
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

  // Send the updated count as a JSON response
  res.json({ count });
});

// Handle 404 for unmatched routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
