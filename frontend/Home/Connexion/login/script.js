const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur
const mail = document.getElementById('mail').value;
const password = document.getElementById('password').value;


document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Code de gestion de la soumission du formulaire ici
});

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
        // Rediriger l'utilisateur vers home.html en cas de succès
        window.location.href = '/home.html';
    } else {
        // Afficher un message d'erreur ou prendre d'autres mesures nécessaires
        alert('Mail/Mot de passe incorrect');
        console.error('Login failed:', data.message);
    }
})
.catch(error => console.error('Error during login:', error));
