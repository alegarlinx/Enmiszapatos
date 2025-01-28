document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const cardForm = document.getElementById('card-form');
    const registerSection = document.getElementById('register-section');
    const cardSection = document.getElementById('card-section');
    const cardList = document.getElementById('card-list');
    let username = '';

    // Función para cargar las tarjetas desde localStorage
    function loadCards() {
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cardList.innerHTML = '';
        cards.forEach((card) => {
            const li = document.createElement('li');
            li.textContent = `${card.username}: ${card.situation}`;
            cardList.appendChild(li);
        });
    }

    // Función para guardar las tarjetas en localStorage
    function saveCards(cards) {
        localStorage.setItem('cards', JSON.stringify(cards));
        loadCards();
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        username = document.getElementById('username').value;
        registerSection.classList.add('hidden');
        cardSection.classList.remove('hidden');
        loadCards();
    });

    cardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const situation = document.getElementById('situation').value;
        const card = {
            username: username,
            situation: situation
        };
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        cards.push(card);
        saveCards(cards);
        document.getElementById('situation').value = '';
    });

    // Cargar las tarjetas al inicio
    loadCards();
});
