document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const cardForm = document.getElementById('card-form');
    const registerSection = document.getElementById('register-section');
    const cardSection = document.getElementById('card-section');
    const cardList = document.getElementById('card-list');
    let username = '';

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
        createCard(situation);
        document.getElementById('situation').value = '';
    });

    function createCard(situation) {
        const card = {
            username: username,
            situation: situation
        };
        fetch('cards.json')
            .then(response => response.json())
            .then(cards => {
                cards.push(card);
                saveCards(cards);
            });
    }

    function loadCards() {
        fetch('cards.json')
            .then(response => response.json())
            .then(cards => {
                cardList.innerHTML = '';
                cards.forEach(card => {
                    const li = document.createElement('li');
                    li.textContent = `${card.username}: ${card.situation}`;
                    cardList.appendChild(li);
                });
            });
    }

    function saveCards(cards) {
        fetch('cards.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cards)
        }).then(() => loadCards());
    }
});
