const loki = require('lokijs');
require('dotenv').config();

const dbPath = process.env.DB_PATH || 'cats.db'
// Initialize LokiJS database
const db = new loki(dbPath, {
    autoload: true,
    autoloadCallback: loadHandler,
    autosave: true,
    autosaveInterval: 4000
});

let catsCollection;

function loadHandler() {
    catsCollection = db.getCollection('cats');
    if (!catsCollection) {
        catsCollection = db.addCollection('cats');
    }
}

// Export the cats collection to be used in other files
module.exports = {
    catsCollection: () => catsCollection
};
