// Ajoutez ce script dans votre fichier script.js
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const mail = document.getElementById('mail').value;
        const password = document.getElementById('password').value;

        // Envoie les données au serveur
        fetch('/api/post/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Connexion réussie!');
                // Redirigez l'utilisateur ou effectuez d'autres actions nécessaires après la connexion réussie.
            } else {
                alert('Échec de la connexion. Vérifiez vos informations d\'identification.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la demande:', error);
            alert('Erreur lors de la demande. Veuillez réessayer.');
        });
    });
});
