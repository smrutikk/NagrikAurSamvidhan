const duties = [
    { name: "14.jpg", description: "equality.jpg" },
    { name: "29.jpg", description: "culture.jpg" },
    { name: "17.jpg", description: "untouch.jpg" },
    { name: "324.jpg", description: "election.jpg" },
    { name: "25.jpg", description: "religion.jpg" }
];

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let timer = 0;
let interval;
let firstFlip = false;
let score = 0;
let swapInterval;

function initGame() {
    duties.forEach((duty, index) => {
        cards.push({ type: 'name', value: duty.name, id: index });
        cards.push({ type: 'description', value: duty.description, id: index });
    });

    cards = shuffle(cards);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = index;
        cardElement.dataset.type = card.type;
        cardElement.dataset.value = card.id;
        // Set card initially with a placeholder or blank content
        const front = document.createElement('div');
        front.classList.add('front');
        front.innerText = 'Flip Me';
        const back = document.createElement('div');
        back.classList.add('back');
        if (card.type !== 'empty') {
            const img = document.createElement('img');
            img.src = `imgs/${card.value}`;
            img.alt = card.type === 'name' ? 'Name Card' : 'Description Card';
            img.classList.add('card-image');
            back.appendChild(img);
        }
        cardElement.appendChild(front);
        cardElement.appendChild(back);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    startSwapInterval();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard() {
    if (!firstFlip) {
        startTimer();
        firstFlip = true;
    }

    if (flippedCards.length === 2) return;

    const card = this;
    if (card.classList.contains('flip')) return;

    card.classList.add('flip');
    document.getElementById('flipSound').play();
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value && card1.dataset.type !== card2.dataset.type) {
        card1.classList.add('match');
        card2.classList.add('match');
        document.getElementById('matchSound').play();
        matchedCards += 2;
        flippedCards = [];
        updateScore();
        if (matchedCards === cards.length) {
            clearInterval(interval);
            clearInterval(swapInterval);
            document.getElementById('message').innerText = `Congratulations! You matched all the cards in ${timer} seconds and scored ${score} points!`;
            playSound();
        }
    } else {
        card1.classList.add('no-match');
        card2.classList.add('no-match');
        document.getElementById('noMatchSound').play();
        setTimeout(() => {
            card1.classList.remove('flip', 'no-match');
            card2.classList.remove('flip', 'no-match');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    interval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = `Time: ${timer} seconds`;
    }, 1000);
}

function updateScore() {
    const timeFactor = 100 - timer; // The quicker the player, the higher the score
    score += Math.max(10, timeFactor); // Minimum score per match is 10
    document.getElementById('score').innerText = `Score: ${score}`;
}

function startSwapInterval() {
    swapInterval = setInterval(() => {
        swapCards();
    }, 10000);
}

function swapCards() {
    const nonFlippedCards = Array.from(document.querySelectorAll('.card:not(.flip):not(.match)'));
    if (nonFlippedCards.length === 0) return;

    const randomCard1 = nonFlippedCards[Math.floor(Math.random() * nonFlippedCards.length)];
    const randomCard2 = nonFlippedCards[Math.floor(Math.random() * nonFlippedCards.length)];

    document.getElementById('swapMessage').innerText = "Both cards getting swapped";
    document.getElementById('swapMessage').style.display = "block";
    document.getElementById('swapSound').play();

    randomCard1.classList.add('zoom-out');
    randomCard2.classList.add('zoom-out');

    setTimeout(() => {
        const temp = {
            type: randomCard1.dataset.type,
            value: randomCard1.dataset.value,
            text: randomCard1.innerHTML
        };

        randomCard1.dataset.type = randomCard2.dataset.type;
        randomCard1.dataset.value = randomCard2.dataset.value;
        randomCard1.innerHTML = randomCard2.innerHTML;

        randomCard2.dataset.type = temp.type;
        randomCard2.dataset.value = temp.value;
        randomCard2.innerHTML = temp.text;

        randomCard1.classList.remove('zoom-out');
        randomCard2.classList.remove('zoom-out');
        document.getElementById('swapMessage').style.display = "none";
    }, 2000);
}

function playSound() {
    const audio = new Audio('congratulations.mp3');
    audio.play();
}

initGame();
