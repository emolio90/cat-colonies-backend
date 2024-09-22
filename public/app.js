const apiUrl = 'http://localhost:3000/cats';  // Change this if necessary for your deployed server

// Fetch and display all cats on page load
document.addEventListener('DOMContentLoaded', fetchCats);

// Fetch all cats from the backend
function fetchCats() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(cats => {
            const catList = document.getElementById('catList');
            catList.innerHTML = '';
            cats.forEach(cat => {
                const catDiv = document.createElement('div');
                catDiv.innerHTML = `
                    <h3>${cat.name}</h3>
                    <p>Location: (${cat.lat}, ${cat.long})</p>
                    <p>Last Fed: ${cat.lastFed}</p>
                    <p>${cat.description}</p>
                    <button onclick="deleteCat(${cat.$loki})">Delete</button>
                    <button onclick="showUpdateForm(${cat.$loki}, '${cat.name}', ${cat.lat}, ${cat.long}, '${cat.lastFed}', '${cat.description}')">Update</button>
                `;
                catList.appendChild(catDiv);
            });
        });
}

// Add a new cat
document.getElementById('addCatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newCat = {
        name: document.getElementById('name').value,
        lat: parseFloat(document.getElementById('lat').value),
        long: parseFloat(document.getElementById('long').value),
        lastFed: document.getElementById('lastFed').value,
        description: document.getElementById('description').value
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCat)
    }).then(() => {
        fetchCats();
        document.getElementById('addCatForm').reset();
    });
});

// Delete a cat
function deleteCat(catId) {
    fetch(`${apiUrl}/${catId}`, { method: 'DELETE' })
        .then(() => fetchCats());
}

// Show update form with cat data
function showUpdateForm(catId, name, lat, long, lastFed, description) {
    const updateSection = document.getElementById('updateCatSection');
    updateSection.classList.remove('hidden');
    document.getElementById('updateName').value = name;
    document.getElementById('updateLat').value = lat;
    document.getElementById('updateLong').value = long;
    document.getElementById('updateLastFed').value = lastFed;
    document.getElementById('updateDescription').value = description;

    document.getElementById('updateCatForm').onsubmit = function (e) {
        e.preventDefault();
        const updatedCat = {
            name: document.getElementById('updateName').value,
            lat: parseFloat(document.getElementById('updateLat').value),
            long: parseFloat(document.getElementById('updateLong').value),
            lastFed: document.getElementById('updateLastFed').value,
            description: document.getElementById('updateDescription').value
        };

        fetch(`${apiUrl}/${catId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedCat)
        }).then(() => {
            fetchCats();
            updateSection.classList.add('hidden');
        });
    };
}
