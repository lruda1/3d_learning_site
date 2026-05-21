

  document.addEventListener("DOMContentLoaded", function () {
    const profileLink = document.getElementById("profileLink");
    const userRole = localStorage.getItem("role");
  
    const userEmailDiv = document.getElementById('userEmail');
  
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
  
        // Припускаємо, що email є в payload.email
        if (payload.email) {
          userEmailDiv.textContent = payload.email;
        } else {
          userEmailDiv.textContent = 'Користувач';
        }
      } catch (e) {
        userEmailDiv.textContent = 'Користувач';
      }
    } else {
      userEmailDiv.textContent = 'Гість';
    }
    
    if (userRole === 'admin') {
      profileLink.href = '/admin.html';
    } else {
      profileLink.href = '/profile.html';
    }
  });