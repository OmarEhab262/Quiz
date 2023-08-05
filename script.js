const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "What is the capital city of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Ag", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
    ],
  },
  {
    question: "In Greek mythology, who is the king of the gods?",
    answers: [
      { text: "Zeus", correct: true },
      { text: "Hades", correct: false },
      { text: "Poseidon", correct: false },
      { text: "Apollo", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Jupiter", correct: true },
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which country is known as the 'Land of the Rising Sun'?",
    answers: [
      { text: "China", correct: false },
      { text: "South Korea", correct: false },
      { text: "Thailand", correct: false },
      { text: "Japan", correct: true },
    ],
  },
  {
    question: "What is the tallest mountain in the world?",
    answers: [
      { text: "Mount Kilimanjaro", correct: false },
      { text: "Mount McKinley (Denali)", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Mount Fuji", correct: false },
    ],
  },
  {
    question:
      "Which famous scientist developed the theory of general relativity?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Galileo Galilei", correct: false },
    ],
  },
  {
    question: "What is the largest organ in the human body?",
    answers: [
      { text: "Heart", correct: false },
      { text: "Liver", correct: true },
      { text: "Brain", correct: false },
      { text: "Skin", correct: false },
    ],
  },
  {
    question: "Which famous playwright wrote 'Romeo and Juliet'?",
    answers: [
      { text: "William Shakespeare", correct: true },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false },
    ],
  },
];

const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
