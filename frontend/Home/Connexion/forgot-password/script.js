const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const responsMailDiv = document.getElementById('responsmail');

    forgotPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut

        // Récupérer les valeurs des champs
        const mail = document.getElementById('mail').value.trim();
        const confirmmail = document.getElementById('confirmmail').value.trim();

        // Effectuer une validation côté client
        if (!isValidEmail(mail)) {
            responsMailDiv.innerText = 'Adresse e-mail invalide';
            return;
        }

        if (mail !== confirmmail) {
            responsMailDiv.innerText = 'Les adresses e-mail ne correspondent pas';
            return;
        }

        // Envoyer les données au serveur
        sendForgotPasswordRequest({ mail, confirmmail })
            .then(result => {
                responsMailDiv.innerText = result.message;
            })
            .catch(error => {
                console.error('Erreur lors de l\'envoi de la requête:', error);
                responsMailDiv.innerText = 'Erreur interne du serveur';
            });
    });

    // Fonction de validation d'e-mail robuste
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fonction pour envoyer la requête au serveur avec des promesses
    function sendForgotPasswordRequest(data) {
        return new Promise((resolve, reject) => {
            fetch(`${apiURL}/api/post/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    resolve(result);
                } else {
                    reject(result);
                }
            })
            .catch(error => {
                reject(error);
            });
        });
    }
});