// API URL alapértelmezett porton
const API_URL = 'http://localhost:3000/cats';

// Táblázat és szűrő mezők referencia
const catsTable = document.querySelector('#catsTable tbody');
const nameFilter = document.querySelector('#nameFilter');
const originFilter = document.querySelector('#originFilter');
const filterButton = document.querySelector('#filterButton');

// Adatok lekérése az API-ból
async function fetchCats(filters = {}) {
    try {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_URL}?${params}`);
        const cats = await response.json();

        renderTable(cats);
    } catch (error) {
        console.error('Hiba az adatok lekérésekor:', error);
    }
}

// Táblázat frissítése
function renderTable(cats) {
    catsTable.innerHTML = ''; // Táblázat ürítése

    cats.forEach((cat) => {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${cat.id}</td>
      <td>${cat.name}</td>
      <td>${cat.origin}</td>
      <td>${cat.length}</td>
      <td><button class="delete-button" data-id="${cat.id}">Törlés</button></td>
    `;

        catsTable.appendChild(row);
    });

    // Törlés gombok eseménykezelői
    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            deleteCat(id);
        });
    });
}

// Macska törlése az API-ból
async function deleteCat(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchCats(); // Táblázat frissítése
    } catch (error) {
        console.error('Hiba a törlés során:', error);
    }
}

// Szűrés gombra kattintás
filterButton.addEventListener('click', () => {
    const filters = {
        name: nameFilter.value,
        origin: originFilter.value,
    };
    fetchCats(filters);
});

// Betöltéskor adatlekérés
fetchCats();
