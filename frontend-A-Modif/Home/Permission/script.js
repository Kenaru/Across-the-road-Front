document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour vérifier les autorisations de l'utilisateur
    function checkPermissions() {
        // Implémentez votre propre logique pour vérifier les permissions de l'utilisateur
        return {
            role: 'login', // Exemple : 'user', 'admin', 'superadmin', etc.
            permissions: ['basic'], // Exemple : ['basic'], ['admin'], ['superadmin'], etc.
        };
    }

    // Fonction pour créer une session après un login réussi
    function createSession() {
        // Vous pouvez stocker des informations dans localStorage ou sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        // Ajoutez d'autres informations à stocker au besoin
    }

    const allowedPaths = [
        '/frontend/home/connexion/login.html',
        '/frontend/home/connexion/loginlogin.html',
        // Ajoutez d'autres chemins autorisés au besoin
    ];

    const userPermissions = checkPermissions();
    const currentPath = window.location.pathname;

    // Vérification de la session et des autorisations
    if (!allowedPaths.includes(currentPath) && userPermissions.role !== 'login') {
        // Vérifier si l'utilisateur est authentifié en vérifiant la session
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            // Rediriger vers la page de login si la session n'est pas présente
            window.location.href = '../frontend/home/connexion/login.html';
            return; // Ajoutez cette ligne pour arrêter l'exécution du script ici
        }

        // Vérification des autorisations pour rediriger l'utilisateur en fonction de son rôle et de ses permissions
        if (userPermissions.permissions.includes('_dev') || userPermissions.permissions.includes('superadmin') || userPermissions.permissions.includes('admin') || userPermissions.permissions.includes('support')) {
            // Rediriger vers la zone admin
            // Ajoutez le chemin de votre zone admin ici
            window.location.href = '/admin';
        } else if (userPermissions.permissions.includes('president') || userPermissions.permissions.includes('membreAsso')) {
            // Rediriger vers la zone Asso
            // Ajoutez le chemin de votre zone Asso ici
            window.location.href = '/asso';
        } else {
            // Laisser l'utilisateur avec les autorisations de base
            // Ajoutez le chemin de votre zone de base ici
            window.location.href = '/base';
        }
    }

    // Si le login est réussi, créez une session
    createSession();
});
