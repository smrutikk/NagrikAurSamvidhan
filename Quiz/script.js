let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const optionsContainer = document.getElementById('options');
  const questionElement = document.getElementById('question');
  
  // Update the question text
  questionElement.innerHTML = currentQuestion.question;

  // Clear any previous options
  optionsContainer.innerHTML = '';

  // Loop through the options and create radio buttons
  currentQuestion.options.forEach((option, index) => {
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

  const answer = selectedOption.value;
  if (answer === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    document.body.innerHTML = `<h2>Quiz completed! Your score is ${score} out of ${questions.length}.</h2>`;
  }
}

// Initialize the quiz
window.onload = loadQuestion;
