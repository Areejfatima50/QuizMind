//dom element
const startScreen= document.getElementById("start-screen");
const quizScreen= document.getElementById("quiz-screen");
const resultScreen= document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const questionText= document.getElementById("question-text");
const answersContainer= document.getElementById("answers-container");
const currentQuestionSpan= document.getElementById("current-question");
const totalQuestionsSpan= document.getElementById("total-questions");
const scoreSpan= document.getElementById("score");
const finalScoreSpan= document.getElementById("final-score");
const resultMessage= document.getElementById("result-message");
const restartButton= document.getElementById("restart-btn");
const progressBar= document.getElementById("progress");
const timerSpan = document.getElementById("timer");

const quizQuestions=[
{
    question:"What is the capital of Pakistan?",
    answers:[
      {  text: "London",correct:false},
      {  text: "Islamabad",correct:true},
      {  text: "London",correct:false},
    ],
},
{
    question: "2.Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
    ],
},
{
    question: "3.What is the largest mammal in the world?",
    answers: [
      { text: "Elephant", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
    ],
},
{
    question: "4.Which country invented tea?",
    answers: [
      { text: "England", correct: false },
      { text: "China", correct: true },
      { text: "India", correct: false },
    ],
},
{
    question: "5.What is the hardest natural substance on Earth?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Diamond", correct: true },
      { text: "Iron", correct: false },
    ],
},
];
//Quiz VAr
let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
finalScoreSpan.textContent=quizQuestions.length;
//Event listner used to run a code when click on te button
startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click",restartQuiz);

function startQuiz()
// {console is used for debugging
//     console.log("quiz started");

// }

{
    currentQuestionIndex=0;
       score=0;
     scoreSpan.textContent=0;
// classlist is used to change the behaviour of an element
     startScreen.classList.remove("active");
     quizScreen.classList.add("active");
     showQuestion();
}

//timer 
let timer;         // To store the setInterval
let timeLeft = 10; // Default time per question


function showQuestion()
{
  answerDisabled=false
  const currentQuestion=quizQuestions[currentQuestionIndex]
  currentQuestionSpan.textContent=currentQuestionIndex + 1
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width=progressPercent + "%"
  questionText.textContent =  currentQuestion.question

  //innerHTML:to insert or replace content with html
  answersContainer.innerHTML="";
  
  currentQuestion.answers.forEach((answer) => {
  const button = document.createElement("button")
  button.textContent=answer.text
  button.classList.add("answer-btn")

  button.dataset.correct=answer.correct

  button.addEventListener("click",selectAnswer)
// appendChild: add elements dynamically
  answersContainer.appendChild(button);
  });
startTimer();
}


function startTimer() {
  clearInterval(timer);         // Clear any previous timer
  timeLeft = 10;                // Reset time
  timerSpan.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerSpan.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      answerDisabled = true;
      currentQuestionIndex++;
      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length) {
          showQuestion();
        } else {
          showResults();
        }
      }, 500); // Short delay before next question
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}


function selectAnswer(event)
{
  stopTimer();
  if(answerDisabled) return

  answerDisabled= true
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct ==="true"
  
  Array.from(answersContainer.children).forEach((button)=>
  {
    if(button.dataset.correct==="true")
    {
      button.classList.add("correct");
    }
    else if(button=== selectedButton){
       button.classList.add("incorrect");
    }
  });

  if(isCorrect)
  {
    score++;
    scoreSpan.textContent=score
  }
setTimeout(()=>
  {
  currentQuestionIndex++;

  if(currentQuestionIndex< quizQuestions.length)
  {
    showQuestion()
  }
  else{
    showResults()
  }
  },1000)
}

function showResults()
{
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent=score;

  const percentage= (score/quizQuestions.length) * 100
  if (percentage==100)
  {
    resultMessage.textContent="Perfect! you ara a genius!";
  }
  else if(percentage >= 80)
  {
    resultMessage.textContent="Great Job!";
  }
 else if(percentage >= 60)
  {
    resultMessage.textContent="Good Effort";
  }
 else if(percentage >= 40)
  {
    resultMessage.textContent="Keep Learning!";
  }
  else 
  {
    resultMessage.textContent="Keep Studing! You Will Get Better";
  }
}

function restartQuiz()
{
    resultScreen.classList.remove("active");
    startQuiz();
    
}