document.getElementById('adminLoginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const message = document.getElementById('loginMessage');

  // Hard-coded credentials (replace later with real database)
  const adminUser = "admin";
  const adminPass = "ntcm123";

  if(username === adminUser && password === adminPass){
    // Save login status in sessionStorage
    sessionStorage.setItem('isAdminLoggedIn', 'true');

    // Redirect to dashboard
    window.location.href = "admin-dashboard.html";
  } else {
    message.textContent = "Invalid username or password!";
  }
});
