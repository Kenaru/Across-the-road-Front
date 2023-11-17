const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const lastName = document.getElementById('lastName').value;
        const firstName = document.getElementById('firstName').value;
        const birthday = document.getElementById('birthday').value;
        const mail = document.getElementById('mail').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Vérification que les mots de passe correspondent
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Envoie des données au serveur pour l'inscription
        fetch(`${apiURL}/api/post/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lastName, firstName, birthday, mail, phoneNumber, password }),
        })
        .then(response => response.json())
        .then(data => {
            // Vérification de la réponse du serveur et mise à jour du contenu du div en conséquence
            if (data.success) {
                alert('Inscription réussie!');
                // Rediriger vers la page de login après l'inscription réussie
                window.location.href = '../login/login.html';
            } else {
                alert(`Erreur d'inscription: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête au serveur:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        });
    });
});
