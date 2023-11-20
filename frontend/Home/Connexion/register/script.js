const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const lastname = document.getElementById('lastname').value;
        const firstname = document.getElementById('firstname').value;
        const birthday = document.getElementById('birthday').value;
        const mail = document.getElementById('mail').value;
        const phonenumber = document.getElementById('phonenumber').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmpassword').value;

        // Vérification que les mots de passe correspondent
        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Hacher le mot de passe côté client avec SHA-256
        const hashedPassword = await hashPassword(password);

        // Envoie des données au serveur pour l'inscription
        fetch(`${apiURL}/api/post/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, lastname, firstname, birthday, phonenumber, password: hashedPassword, permission: user }),
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

    // Fonction pour hacher le mot de passe avec SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
        return hashedPassword;
    }
});
