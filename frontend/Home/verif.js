document.addEventListener('DOMContentLoaded', function () {
    // Vérifie si l'utilisateur est connecté au chargement de la page
    if (!isLoggedIn()) {
        // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
        window.location.href = 'Connexion/login/login.html';
    }
});

function isLoggedIn() {
    // Vérifie si l'utilisateur est connecté en consultant le stockage local (localStorage)
    return localStorage.getItem('isLoggedIn') === 'true';
}
