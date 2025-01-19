function addEmployee() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;

    if (name && email && role && id) {
        const tableBody = document.getElementById('employeeTableBody');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${role}</td>
            <td>${id}</td>
            <td>${status}</td>
        `;

        tableBody.appendChild(row);

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('role').value = '';
        document.getElementById('id').value = '';
        document.getElementById('status').value = 'employed';
    } else {
        alert('Please fill all fields.');
    }
}

function filterTable() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('employeeTableBody').getElementsByTagName('tr');

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let match = false;

        for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(searchValue)) {
                match = true;
                break;
            }
        }

        row.style.display = match ? '' : 'none';
    }
}
