document.addEventListener('DOMContentLoaded', function () {
    const resetPasswordForm = document.getElementById('reset-password-form');
    const responseDiv = document.getElementById('response');
    const urlParams = new URLSearchParams(window.location.search);

    resetPasswordForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        const token = urlParams.get('token'); // Récupérer le token depuis l'URL
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        // Effectuer une validation côté client
        if (!isValidPassword(password)) {
            responseDiv.innerHTML = '<p>Mot de passe invalide</p>';
            return;
        }

        if (password !== confirmPassword) {
            responseDiv.innerHTML = '<p>Les mots de passe ne correspondent pas</p>';
            return;
        }

        // Hacher le mot de passe côté client avec SHA-256
        const hashedPassword = await hashPassword(password);

        // Envoyer les données au serveur
        sendResetPasswordRequest({ token, password: hashedPassword });
    });

    // Fonction de validation de mot de passe simple
    function isValidPassword(password) {
        // Le mot de passe doit contenir au moins 8 caractères
        // et au moins une lettre majuscule, une lettre minuscule et un chiffre
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#°.£¤µ,?\\§;!ù%²$=%^~'\-`\/\[\]&*()_+{}|:<>?]).{8,}$/;

        return passwordRegex.test(password);
    }

    // Fonction pour hacher le mot de passe avec SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashedPassword;
    }

    // Fonction pour envoyer la requête au serveur
    function sendResetPasswordRequest(data) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${data.token}`); // Ajouter le token dans l'en-tête
    
        const requestBody = {
            token: data.token,
            password: data.password,
            confirmPassword: data.password // Utiliser le même champ pour le mot de passe confirmé
        };
    
        fetch(`${apiURL}/api/post/reset-password`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody), // Utiliser requestBody au lieu de data
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de réseau - Impossible de joindre le serveur.');
            }
            return response.json();
        })
        .then(result => {
            if (result.success) {
                responseDiv.innerHTML = '<p>Mot de passe réinitialisé avec succès</p>';
            } else {
                responseDiv.innerHTML = `<p>Erreur: ${result.message}</p>`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la requête:', error);
            responseDiv.innerHTML = '<p>Erreur interne du serveur</p>';
        });
    }    
});
