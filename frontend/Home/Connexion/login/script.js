const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const responseDiv = document.getElementById('response');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const mail = document.getElementById('mail').value;
        const password = document.getElementById('password').value;

        // Hacher le mot de passe côté client avec SHA-256
        const hashedPassword = await hashPassword(password);

        // Envoie les données au serveur
        fetch(`${apiURL}/api/post/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password: hashedPassword }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Login réussi, redirigez vers la page index.html
                window.location.href = '../../index.html';
            } else {
                // Login échoué
                responseDiv.innerHTML = '<p>Login échoué. Vérifiez votre email et/ou mot de passe.</p>';
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête au serveur:', error);
            // Affichez un message d'erreur générique
            responseDiv.innerHTML = '<p>Une erreur s\'est produite. Veuillez réessayer plus tard.</p>';
        });
    });

    // Fonction pour hacher le mot de passe avec SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashedPassword;
    }
});
