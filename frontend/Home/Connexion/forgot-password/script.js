const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    forgotPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Récupérez les valeurs des champs
        const mail = document.getElementById('mail').value;
        const birthday = document.getElementById('birthday').value;

        // Vérifiez le format de l'e-mail
        if (!isValidEmail(mail)) {
            alert('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        // Vérifiez si l'e-mail correspond à la date de naissance
        if (!isValidBirthday(mail, birthday)) {
            alert('L\'e-mail ne correspond pas à la date de naissance.');
            return;
        }

        // Envoyez l'e-mail de réinitialisation au backend
        fetch('http://localhost:5000/api/post/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mail, birthday }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('E-mail de réinitialisation envoyé avec succès!');
            } else {
                alert(`Erreur: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête au serveur:', error);
            alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
        });
    });

    // Fonction pour vérifier le format de l'e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Fonction pour vérifier si l'e-mail correspond à la date de naissance
    function isValidBirthday(mail, birthday) {
        // Ajoutez votre logique de validation ici
        // Par exemple, vous pouvez comparer les deux valeurs et retourner vrai ou faux en conséquence
        return mail === birthday;
    }
});
