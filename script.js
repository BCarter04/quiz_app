const questions = [        // array of questions
    {
        question: "In which part of your body would you find the cruciate ligament?",
        answers: [
            { text: "Neck", correct: false},
            { text: "Brain", correct: false},
            { text: "Knee", correct: true},
            { text: "Head", correct: false},
        ]
    },
    {
        question: "Who was the head of state in Japan during the second world war?",
        answers: [
            { text: "Emperor Hirohito", correct: true},
            { text: "General Hana", correct: false},
            { text: "Emperor Hiroshi", correct: false},
            { text: "Prime minister Emiko", correct: false},
        ]
    },
    {
        question: "What is the currency of Denmark?",
        answers: [
            { text: "Krone", correct: true},
            { text: "Forint", correct: false},
            { text: "Dram", correct: false},
            { text: "Dong", correct: false},
        ]
    },
    {
        question: "What is the capital of New Zealand?",
        answers: [
            { text: "Olivia", correct: false},
            { text: "Las Vegas", correct: false},
            { text: "Marathon", correct: false},
            { text: "Wellington", correct: true},
        ]
    },
    {
        question: "Which popular video game franchise has released games with the subtitles World At War and Black Ops?",
        answers: [
            { text: "Apex Legends", correct: false},
            { text: "Counter Strike", correct: false},
            { text: "Call of Duty", correct: true},
            { text: "Battlefield", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-questions");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {         // display questions
    resetState();                 //remove all previous questions
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {       //display answers
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState() {                //remove all previous answers
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";    
}
function showScore(){
    resetState();
    questionElement.innerHTML = 'you scored ${score} out of ${questions.length} questions!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextQuestion(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextQuestion();
    }else{
        startQuiz();
    }
});

startQuiz();