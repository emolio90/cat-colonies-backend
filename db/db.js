const loki = require('lokijs');

// Initialize LokiJS database
const db = new loki('cats.db', {
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
