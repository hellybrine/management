document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get input values
    const name = document.getElementById('employeeName').value;
    const role = document.getElementById('employeeRole').value;
    const privileges = document.getElementById('employeePrivileges').value;
  
    // Simulate adding data to DynamoDB (for now we'll just append it to the page)
    const employee = { name, role, privileges };
  
    displayEmployee(employee);
  
    // Clear form fields
    document.getElementById('employeeName').value = '';
    document.getElementById('employeeRole').value = '';
    document.getElementById('employeePrivileges').value = '';
  });
  
  function displayEmployee(employee) {
    const employeeList = document.getElementById('employeeList');
    
    const employeeDiv = document.createElement('div');
    employeeDiv.classList.add('employee');
  
    employeeDiv.innerHTML = `
      <strong>Name:</strong> ${employee.name} <br>
      <strong>Role:</strong> ${employee.role} <br>
      <strong>Privileges:</strong> ${employee.privileges}
    `;
  
    employeeList.appendChild(employeeDiv);
  }  