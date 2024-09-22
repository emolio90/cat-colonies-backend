const express = require('express');
const router = express.Router();
const { catsCollection } = require('../db/db');

// GET /cats - Fetch all cats
router.get('/', (req, res) => {
    const allCats = catsCollection().find();
    res.json(allCats);
});

// GET /cats/:id - Fetch a specific cat by ID
router.get('/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const cat = catsCollection().findOne({ $loki: catId });

    if (cat) {
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

// POST /cats - Add a new cat
router.post('/', (req, res) => {
    const newCat = req.body;
    catsCollection().insert(newCat);
    res.status(201).json(newCat);
});

// PUT /cats/:id - Update a cat's information
router.put('/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    let cat = catsCollection().findOne({ $loki: catId });

    if (cat) {
        Object.assign(cat, req.body);
        catsCollection().update(cat);
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

// DELETE /cats/:id - Remove a cat
router.delete('/:id', (req, res) => {
    const catId = parseInt(req.params.id);
    const cat = catsCollection().findOne({ $loki: catId });

    if (cat) {
        catsCollection().remove(cat);
        res.json(cat);
    } else {
        res.status(404).json({ message: 'Cat not found' });
    }
});

module.exports = router;
