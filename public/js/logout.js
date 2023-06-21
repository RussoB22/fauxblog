async function logout() {
  try {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      location.reload(); 
    } else {
      throw new Error('Error:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeString = hours.toString().padStart(2, '0') + ':' +
                   minutes.toString().padStart(2, '0') + ':' +
                   seconds.toString().padStart(2, '0');
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);

document.querySelector('#logout').addEventListener('click', logout);

let timeout;

function resetLogoutTimer() {
  clearTimeout(timeout);
  timeout = setTimeout(logout, 120000);
}

setInterval(updateClock, 1000);
document.querySelector('#logout').addEventListener('click', logout);
document.addEventListener('click', resetLogoutTimer);

resetLogoutTimer();