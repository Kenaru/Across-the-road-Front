// Ajoutez ce script dans votre fichier script.js
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const mail = document.getElementById('Mail').value;
        const lastName = document.getElementById('LastName').value;
        const firstName = document.getElementById('FirstName').value;
        const birthday = document.getElementById('Birthday').value;
        const phoneNumber = document.getElementById('PhoneNumber').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('ConfirmPassword').value;

        // Vérifiez si les mots de passe correspondent
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Envoie les données au serveur
        fetch('/api/post/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, lastName, firstName, birthday, phoneNumber, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inscription réussie! Vous pouvez maintenant vous connecter.');
                // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres actions nécessaires après l'inscription réussie.
            } else {
                alert('Erreur lors de l\'inscription. Veuillez vérifier vos informations.');
            }
        })        
        .catch(error => {
            console.error('Erreur lors de la demande:', error);
            alert('Erreur lors de la demande. Veuillez réessayer.');
        });
    });
});
