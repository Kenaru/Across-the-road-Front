const apiURL = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

document.addEventListener('DOMContentLoaded', function () {
    const bubble = document.querySelector('header');  
    const colors = ['#d31416', '#f28a29', '#fedc0f', '#a1c264', '#089ed3', '#694a98'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    bubble.style.backgroundColor = randomColor;
});