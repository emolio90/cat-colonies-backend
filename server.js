const express = require('express');
const loki = require('lokijs');
const path = require('path'); // Import path to resolve file paths

// Initialize the Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" folder (for front-end)
app.use(express.static(path.join(__dirname, 'public')));

// Initialize LokiJS database and load the data from 'cats.db'
const db = new loki('cats.db', {
    autoload: true,
    autoloadCallback: loadHandler,
    autosave: true,
    autosaveInterval: 4000  // Save every 4 seconds
});

let catsCollection;

// Load the database or create the collection
function loadHandler() {
    catsCollection = db.getCollection('cats');
    if (!catsCollection) {
        catsCollection = db.addCollection('cats');
    }
}

// GET /cats - Fetch all cats
app.get('/cats', (req, res) => {
    const allCats = catsCollection.find();
    res.json(allCats);
});

// GET /cats/:id - Fetch a specific cat by ID
app.get('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const cat = catsCollection.findOne({ $loki: catId });

    if (cat) {
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

// POST /cats - Add a new cat
app.post('/cats', (req, res) => {
    const newCat = req.body;
    catsCollection.insert(newCat);
    res.status(201).json(newCat);
});

// PUT /cats/:id - Update a cat's information
app.put('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    let cat = catsCollection.findOne({ $loki: catId });

    if (cat) {
        Object.assign(cat, req.body);  // Merge updated data
        catsCollection.update(cat);    // Save the update
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

// DELETE /cats/:id - Remove a cat
app.delete('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const cat = catsCollection.findOne({ $loki: catId });

    if (cat) {
        catsCollection.remove(cat);
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
