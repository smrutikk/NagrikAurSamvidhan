let currentQuestionIndex = 0;
let score = 0;
let isSampleQuiz = true; // Flag to track which quiz is running
const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Who wrote the Indian Constitution?",
    options: ["Dr. B.R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
    correctAnswer: "Dr. B.R. Ambedkar"
  },
  {
    question: "How many fundamental rights are there in the Indian Constitution?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  loadQuestion();
});

function loadQuestion() {
  const currentQuestions = isSampleQuiz ? sampleQuestions : questions; // Use actual questions if sample quiz is done
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const optionsContainer = document.getElementById('options');
  const questionElement = document.getElementById('question-text');

  // Update the question text
  questionElement.innerHTML = currentQuestion.question;

  // Clear any previous options
  optionsContainer.innerHTML = '';

  // Loop through the options and create radio buttons
  currentQuestion.options.forEach(option => {
    const optionHTML = `
      <div>
        <input type="radio" name="option" value="${option}">
        <label>${option}</label>
      </div>
    `;
    optionsContainer.innerHTML += optionHTML;
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert('Please select an option!');
    return;
  }

  const currentQuestions = isSampleQuiz ? sampleQuestions : questions; // Use actual questions if sample quiz is done
  const answer = selectedOption.value;

  if (answer === currentQuestions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuestions.length) {
    loadQuestion();
  } else if (isSampleQuiz) {
    // End of sample quiz, switch to actual quiz
    isSampleQuiz = false;
    currentQuestionIndex = 0;
    alert('Sample quiz completed! Starting the actual quiz now.');
    loadQuestion();
  } else {
    // End of actual quiz
    document.body.innerHTML = `<h2>Quiz completed! Your score is ${score} out of ${
      sampleQuestions.length + questions.length
    }.</h2>`;
  }
}
