function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Effectue une requête AJAX au serveur
    var xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiURL}/api/post/login`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if (response.success) {
                // Connexion réussie, stocke l'information de connexion et redirige
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'home.html';
            } else {
                alert('Identifiants incorrects');
            }
        }
    };

    // Envoie les informations de connexion au serveur
    var data = JSON.stringify({ username: username, password: password });
    xhr.send(data);
}
