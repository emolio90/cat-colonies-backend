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

app.post('/cats', (req, res) => {
    const newCat = req.body;
    newCat.id = cats.length + 1;
    cats.push(newCat);
    res.status(201).json(newCat);
})