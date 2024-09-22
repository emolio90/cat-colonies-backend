const express = require('express');
const path = require('path'); // Import path to resolve file paths
const catRoutes = require('./routes/catRoutes');

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" folder (for front-end)
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the routes/catRoutes.js file
app.use('/cats', catRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
