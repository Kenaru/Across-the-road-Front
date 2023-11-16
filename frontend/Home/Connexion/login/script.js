const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const mail = document.getElementById('mail').value;
        const password = document.getElementById('password').value;
        
        // Envoie les données au serveur
        fetch(`${apiURL}/api/post/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password }),
        })

        document.addEventListener('DOMContentLoaded', () => {
            const resultElement = document.getElementById('response');
            fetch(`${apiURL}/api/post/login`)
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            resultElement.textContent = `Login Succes`;
          })
          .catch(error => {
            console.error('Login pas succes', error);
          });
        });
    });
});
