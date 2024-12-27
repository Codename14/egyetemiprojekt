const apiUrl = 'http://localhost:3000/cats'; // API alap URL

// Táblázat frissítése
const updateTable = (data) => {
    const tableBody = document.querySelector('#catsTable tbody');
    tableBody.innerHTML = ''; // Táblázat ürítése

    data.forEach((cat, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${cat.name}</td>
            <td>${cat.origin}</td>
            <td>${cat.length}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-button" data-id="${cat.id}">Törlés</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Törlés gombok eseménykezelése
    document.querySelectorAll('.delete-button').forEach((button) => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            deleteCat(id);
        });
    });
};

// Adatok lekérése az API-ból
const fetchCats = async (filters = {}) => {
    let query = new URLSearchParams(filters).toString();
    try {
        const response = await fetch(`${apiUrl}?${query}`);
        const data = await response.json();
        updateTable(data);
    } catch (error) {
        console.error('Hiba az adatok lekérésekor:', error);
    }
};

// Macska törlése az API-ból
const deleteCat = async (id) => {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        fetchCats(); // Táblázat frissítése
    } catch (error) {
        console.error('Hiba a törlés során:', error);
    }
};

// Szűrés gomb eseménykezelése
document.getElementById('filterButton').addEventListener('click', () => {
    const nameFilter = document.getElementById('nameFilter').value;
    const originFilter = document.getElementById('originFilter').value;

    const filters = {};
    if (nameFilter) filters.name = nameFilter;
    if (originFilter) filters.origin = originFilter;

    fetchCats(filters);
});

// Oldal betöltésekor az adatok betöltése
document.addEventListener('DOMContentLoaded', () => {
    fetchCats();
});
