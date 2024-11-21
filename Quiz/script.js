import { db, collection, addDoc, serverTimestamp } from "../Auth/Config.js";
import { questions } from "./questions.js";

console.log(db)

let currentQuestionIndex = 0;
let score = 0;
let isSampleQuiz = true;

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
  const currentQuestions = isSampleQuiz ? sampleQuestions : questions;
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const optionsContainer = document.getElementById("options");
  const questionElement = document.getElementById("question-text");

  // Update the question text
  questionElement.innerHTML = currentQuestion.question;

  // Clear previous options
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option) => {
    const optionHTML = `
      <div>
        <input type="radio" name="option" value="${option}">
        <label>${option}</label>
      </div>`;
    optionsContainer.innerHTML += optionHTML;
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector("input[name='option']:checked");
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  const currentQuestions = isSampleQuiz ? sampleQuestions : questions;
  const answer = selectedOption.value;

  if (answer === currentQuestions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuestions.length) {
    loadQuestion();
  } else if (isSampleQuiz) {
    isSampleQuiz = false;
    currentQuestionIndex = 0;
    alert("Sample quiz completed! Starting the actual quiz now.");
    loadQuestion();
  } else {
    document.body.innerHTML = `<h2>Quiz completed! Your score is ${score} out of ${
      sampleQuestions.length + questions.length
    }.</h2>`;

    saveScoreToFirestore(score);
  }
}

async function saveScoreToFirestore(score, userId = "anonymous") {
  try {
    // Ensure the db object is correctly passed
    const quizScoresCollection = collection(db, "quizScores");
    console.log(quizScoresCollection); // Check if the collection reference is valid

    // Add document to Firestore collection
    await addDoc(quizScoresCollection, {
      score: score,
      timestamp: serverTimestamp(),
      userId: userId
    });
    console.log("Score saved to Firestore successfully!");
  } catch (error) {
    console.error("Error saving score to Firestore: ", error);
  }
}


// Make nextQuestion globally accessible
window.nextQuestion = nextQuestion;
