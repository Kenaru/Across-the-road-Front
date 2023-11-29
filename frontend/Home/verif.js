const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur


// Frontend - Appel à l'API pour vérifier l'état de connexion
const checkLoggedInStatus = async () => {
    const userId = 23;
    try {
        const response = await fetch(`${apiURL}/api/checkLoggedInStatus?userId=${userId}`);
        if (response.ok) {
            const data = await response.json();
            const isLoggedIn = data.isLoggedIn;
            if (isLoggedIn) {
                console.log('L\'utilisateur est connecté.');
                // Faire quelque chose lorsque l'utilisateur est connecté
            } else {
                console.log('L\'utilisateur n\'est pas connecté.');
                // Faire quelque chose lorsque l'utilisateur n'est pas connecté
            }
        } else {
            console.error('Erreur lors de la récupération de l\'état de connexion');
        }
    } catch (error) {
        console.error('Erreur lors de la requête pour vérifier l\'état de connexion:', error);
    }
};

// Appel de la fonction pour vérifier l'état de connexion
checkLoggedInStatus();
