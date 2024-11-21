const questions = [
    {
        question: "Which part of the Indian Constitution deals with Fundamental Rights?",
        options: ["Part II", "Part III", "Part IV", "Part V"],
        answer: "Part III"
    },
    {
        question: "How many Fundamental Rights are originally enshrined in the Indian Constitution?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "Which Article of the Indian Constitution abolishes untouchability?",
        options: ["Article 15", "Article 17", "Article 21", "Article 32"],
        answer: "Article 17"
    },
    {
        question: "What is the minimum age to become the President of India?",
        options: ["25 years", "30 years", "35 years", "40 years"],
        answer: "35 years"
    },
    {
        question: "Which part of the Constitution contains the Directive Principles of State Policy?",
        options: ["Part II", "Part III", "Part IV", "Part V"],
        answer: "Part IV"
    },
    {
        question: "Who is known as the 'Father of the Indian Constitution'?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar", "Sardar Patel"],
        answer: "B.R. Ambedkar"
    },
    {
        question: "Which Article of the Indian Constitution provides for the Right to Education?",
        options: ["Article 21A", "Article 45", "Article 46", "Article 51A"],
        answer: "Article 21A"
    },
    {
        question: "What is the official language of the Union of India according to the Constitution?",
        options: ["English", "Hindi", "Sanskrit", "All of the above"],
        answer: "Hindi"
    },
    {
        question: "Which Amendment Act added Fundamental Duties to the Indian Constitution?",
        options: ["42nd Amendment Act", "44th Amendment Act", "86th Amendment Act", "91st Amendment Act"],
        answer: "42nd Amendment Act"
    },
    {
        question: "How many schedules are there in the Indian Constitution?",
        options: ["10", "12", "14", "22"],
        answer: "12"
    },
    {
        question: "Which Article of the Indian Constitution provides for the Right to Freedom of Religion?",
        options: ["Article 19", "Article 21", "Article 25", "Article 32"],
        answer: "Article 25"
    },
    {
        question: "What is the tenure of a Lok Sabha member in India?",
        options: ["4 years", "5 years", "6 years", "7 years"],
        answer: "5 years"
    },
    {
        question: "Which Article of the Constitution provides for the formation of new states?",
        options: ["Article 1", "Article 2", "Article 3", "Article 4"],
        answer: "Article 3"
    },
    {
        question: "Who appoints the Chief Justice of India?",
        options: ["Prime Minister", "President", "Law Minister", "Parliament"],
        answer: "President"
    },
    {
        question: "Which part of the Constitution deals with the Panchayati Raj?",
        options: ["Part VIII", "Part IX", "Part X", "Part XI"],
        answer: "Part IX"
    },
    {
        question: "What is the minimum age to become a member of the Rajya Sabha?",
        options: ["25 years", "30 years", "35 years", "40 years"],
        answer: "30 years"
    },
    {
        question: "Which Article provides for the establishment of the Election Commission?",
        options: ["Article 280", "Article 315", "Article 324", "Article 352"],
        answer: "Article 324"
    },
    {
        question: "What is the maximum gap allowed between two sessions of Parliament?",
        options: ["3 months", "6 months", "9 months", "12 months"],
        answer: "6 months"
    },
    {
        question: "Which Schedule of the Constitution contains provisions for anti-defection?",
        options: ["Eighth Schedule", "Ninth Schedule", "Tenth Schedule", "Eleventh Schedule"],
        answer: "Tenth Schedule"
    },
    {
        question: "Who was the Chairman of the Drafting Committee of the Indian Constitution?",
        options: ["Jawaharlal Nehru", "B.R. Ambedkar", "Rajendra Prasad", "Sardar Patel"],
        answer: "B.R. Ambedkar"
    }
];

let currentQuestionIndex = -1;
let streak = 0;
let score = 0;
let questionsAnswered = 0;
const totalQuestions = 10;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextQuestionButton = document.getElementById('nextQuestion');
const streakElement = document.getElementById('streakCount');
const scoreElement = document.getElementById('score');
const progressElement = document.getElementById('progress');
const celebrationElement = document.getElementById('celebration');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const restartGameButton = document.getElementById('restartGame');

function showQuestion() {
    if (questionsAnswered >= totalQuestions) {
        endGame();
        return;
    }

    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[currentQuestionIndex];

    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });

    nextQuestionButton.style.display = 'none';
}

function selectOption(index) {
    const question = questions[currentQuestionIndex];
    const options = optionsElement.children;

    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled');
        if (i === index) {
            if (question.options[i] === question.answer) {
                options[i].classList.add('correct');
                streak++;
                score += 10 + (streak * 2);
                celebrate();
            } else {
                options[i].classList.add('wrong');
                streak = 0;
            }
        } else if (question.options[i] === question.answer) {
            options[i].classList.add('correct');
        }
    }

    questionsAnswered++;
    updateUI();
    nextQuestionButton.style.display = 'inline-block';
}

function updateUI() {
    streakElement.textContent = streak;
    scoreElement.textContent = score;
    progressElement.style.width = `${(questionsAnswered / totalQuestions) * 100}%`;
}

function celebrate() {
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';

    celebrationElement.appendChild(confetti);

    confetti.addEventListener('animationend', function() {
        confetti.remove();
    });
}

function endGame() {
    document.querySelector('.question-container').style.display = 'none';
    nextQuestionButton.style.display = 'none';
    gameOverElement.style.display = 'block';
    finalScoreElement.textContent = score;
}

function restartGame() {
    questionsAnswered = 0;
    score = 0;
    streak = 0;
    updateUI();
    gameOverElement.style.display = 'none';
    document.querySelector('.question-container').style.display = 'block';
    showQuestion();
}

nextQuestionButton.addEventListener('click', showQuestion);
restartGameButton.addEventListener('click', restartGame);

showQuestion();