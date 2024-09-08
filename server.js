const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic route to test if server is working
app.get('/', (req, res) => {
    res.send('Hello, to all the catCats!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

let cats = [
    {
        id: 1,
        name: "Gazpacho",
        lat: -0.5151780821459511,
        long: 38.39203503246884,
        lastFed: "2024-09-01",
        description: "Dormilón, gruñón, cagón"
    },
    {
        id: 2,
        name: "Salmorejo",
        lat: -0.5144675744871279,
        long: 38.39151012307428,
        lastFed: "2024-08-01",
        description: "Alérgico, tóxico, cínico"
    }
]

app.get('/cats', (req, res) => {
    res.json(cats);
});

app.get('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const cat = cats.find(c => c.id === catId);

    if (cat) {
        res.json(cat);
    } else {
        res.status(404).json({ message: "Cat not found"});
    }
});

app.post('/cats', (req, res) => {
    const newCat = req.body;
    newCat.id = cats.length + 1;
    cats.push(newCat);
    res.status(201).json(newCat);
});

app.put('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const catIndex = cats.findIndex(c => c.id === catId);

    if(catIndex !== -1) {
        const updatedCat = { ...cats[catIndex], ...req.body };
        cats[catIndex] = updatedCat;
        res.json(updatedCat);
    } else {
        res.status(404).json({ message: "Cat not found"});
    }
});

app.delete('/cats/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const catIndex = cats.findIndex(c => c.id === catId);

    if (catIndex !== -1) {
        const deletedCat = cats.splice(catIndex, 1);
        res.json(deletedCat[0]);
    } else {
        res.status(404).json({ message: "Cat not found"});
    }
});

