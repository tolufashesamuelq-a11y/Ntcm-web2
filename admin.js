// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('isAdminLoggedIn');
  window.location.href = "admin-login.html";
});

// Load registrations from localStorage
let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
const tableBody = document.querySelector('#registrationsTable tbody');

function renderRegistrations() {
  tableBody.innerHTML = '';
  registrations.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.fullName}</td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td>${r.churchName}</td>
      <td>${r.branch}</td>
      <td>${r.eventType}</td>
      <td>${r.attendanceDay}</td>
      <td>${r.accommodation}</td>
      <td>${r.origin}</td>
      <td>${r.position}</td>
      <td>${r.maritalStatus}</td>
      <td>${r.gender}</td>
      <td>${r.notes}</td>
    `;
    tableBody.appendChild(tr);
  });
}

renderRegistrations();
