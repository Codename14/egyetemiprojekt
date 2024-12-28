const apiUrl = 'http://localhost:3000/cats'; // API alap URL

// Táblázat frissítése
const updateTable = (data) => {
    const tableBody = document.querySelector('#catsTable tbody');
    tableBody.innerHTML = ''; // Táblázat ürítése

    if (data.length === 0) {
        // Ha nincs adat, üzenet megjelenítése
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 5; // Az oszlopok számával egyezzen meg
        cell.classList.add('text-center');
        cell.textContent = 'Nincs adat';
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

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
const fetchCats = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Hiba az adatok lekérésekor:', error);
        return [];
    }
};

// Macska törlése az API-ból
const deleteCat = async (id) => {
    try {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        const allCats = await fetchCats(); // Táblázat frissítése a törlés után
        updateTable(allCats);
    } catch (error) {
        console.error('Hiba a törlés során:', error);
    }
};

// Szűrés gomb eseménykezelése
document.getElementById('filterButton').addEventListener('click', async () => {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
    const originFilter = document.getElementById('originFilter').value.toLowerCase();

    const allCats = await fetchCats();

    // Szűrés a frontend oldalon
    const filteredData = allCats.filter((cat) => {
        const nameMatches = nameFilter ? cat.name.toLowerCase().includes(nameFilter) : true;
        const originMatches = originFilter ? cat.origin.toLowerCase().includes(originFilter) : true;
        return nameMatches && originMatches;
    });

    updateTable(filteredData);
});

// Oldal betöltésekor az adatok betöltése
document.addEventListener('DOMContentLoaded', async () => {
    const allCats = await fetchCats();
    updateTable(allCats);
});
