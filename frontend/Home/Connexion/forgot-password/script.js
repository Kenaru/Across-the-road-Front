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
        sendForgotPasswordRequest({ mail, confirmmail });
    });

    // Fonction de validation d'e-mail simple
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fonction pour envoyer la requête au serveur
    function sendForgotPasswordRequest(data) {
        fetch('http://localhost:5000/api/post/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                responsMailDiv.innerText = 'E-mail de réinitialisation envoyé avec succès';
            } else {
                responsMailDiv.innerText = 'Erreur: ' + result.message;
            }
        })
        .catch(error => {
            console.error('Erreur lors de l\'envoi de la requête:', error);
            responsMailDiv.innerText = 'Erreur interne du serveur';
        });
    }
});

