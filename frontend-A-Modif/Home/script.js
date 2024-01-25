const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const bubble = document.querySelector('header');  
    const colors = ['#d31416', '#f28a29', '#fedc0f', '#a1c264', '#089ed3', '#694a98'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    bubble.style.backgroundColor = randomColor;
});

document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout');

    logoutButton.addEventListener('click', function () {
        fetch(`${apiURL}/api/post/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Déconnexion réussie, redirigez vers la page de login
                window.location.href = '../Home/connexion/login/login.html'; // Remplacez par la page de login appropriée
            } else {
                // Échec de la déconnexion
                alert('Déconnexion échouée. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la déconnexion:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        });
    });
});
