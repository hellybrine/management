const apiGatewayUrl = 'https://8um8pwu535.execute-api.eu-north-1.amazonaws.com/Test';

document.addEventListener("DOMContentLoaded", function() {
    fetchEmployees();
});

function addEmployee() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;
    const id = document.getElementById('id').value;
    const status = document.getElementById('status').value;

    if (name && email && role && id) {
        const data = {
            operation: 'insert',
            employeid: id,
            name: name,
            email: email,
            role: role,
            status: status
        };

        fetch(apiGatewayUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.statusCode === 200) {
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
                alert('Error: ' + responseData.body);
            }
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
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

function fetchEmployees() {
    fetch(apiGatewayUrl + '?operation=view', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.statusCode === 200) {
            const tableBody = document.getElementById('employeeTableBody');
            tableBody.innerHTML = '';

            responseData.body.forEach(employee => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.role}</td>
                    <td>${employee.employeid}</td>
                    <td>${employee.status}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            alert('Error: ' + responseData.body);
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}

function deleteEmployee(employeid) {
    const data = {
        operation: 'delete',
        employeid: employeid
    };

    fetch(apiGatewayUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(responseData => {
        if (responseData.statusCode === 200) {
            alert('Employee deleted successfully!');
            fetchEmployees();  // Refresh employee list
        } else {
            alert('Error: ' + responseData.body);
        }
    })
    .catch(error => {
        alert('Error: ' + error.message);
    });
}
