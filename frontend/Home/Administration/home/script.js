const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur
const resultElement = document.getElementById('result');


// script.mjs
document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('result');
  fetch(`${apiURL}/api/get/countAssoWebsite`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    resultElement.textContent = `Nombre d'utilisateurs dans AssoWebsite : ${data.nbrAssoWebsite}`;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('Users');
  fetch(`${apiURL}/api/get/UsersCount`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    resultElement.textContent = `Nombre d'utilisateurs : ${data.nbrUser}`;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('AssoOnline');
  fetch(`${apiURL}/api/get/CountAssoOnline`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    resultElement.textContent = `Nombre d'association en ligne : ${data.AssoOnline}`;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('prezOnline');
  fetch(`${apiURL}/api/get/CountPrezOnline`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    resultElement.textContent = `Nombre de président : ${data.prezOnline}`;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('AdminOnline');
  fetch(`${apiURL}/api/get/AdminOnline`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    resultElement.textContent = `Nombre d'admin : ${data.AdminOnline}`;
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des données :', error);
  });
});