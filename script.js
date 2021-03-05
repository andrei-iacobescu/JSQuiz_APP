const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who was the first president of the United States?',
    answers: [
      { text: 'George Washington', correct: true },
      { text: 'Benjamin Franklin', correct: false },
      { text: 'Thomas Jefferson', correct: false },
      { text: 'George W. Bush', correct: false }
    ]
  },
  {
    question: 'When did World War II start?',
    answers: [
      { text: '1945', correct: false },
      { text: '1938', correct: false },
      { text: '1928', correct: false },
      { text: '1939', correct: true }
    ]
  },
  {
    question: 'What is the longest river in the world?',
    answers: [
      { text: 'Euphrates River', correct: false },
      { text: 'River Nile', correct: true },
      { text: 'Danube River', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'In football, which team has won the Champions League (formerly the European Cup) the most?',
    answers: [
      { text: 'Barcelona', correct: false },
      { text: 'Atletico Madrid', correct: false },
      { text: 'Bayern Munich', correct: false },
      { text: 'Real Madrid', correct: true }
    ]
  }
]