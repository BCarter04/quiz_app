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
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;        // question reset
    score = 0;                       // score reset
    nextButton.innerHTML = "Next";   // change button text to restart
    showQuestion();            // show question
}

function showQuestion() {         // display questions
    resetState();                 //remove all previous questions
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {             //display answers
        const button = document.createElement("button");   // create button tag and save in button
        button.innerHTML = answer.text;                     // add text to button
        button.classList.add("btn");                        // add button
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;   // add correct class to button
        }
        button.addEventListener("click", selectAnswer);     // add event listener to button to call selectAnswer
    })
}


function resetState() {                
    nextButton.style.display = "none";     // hide next button
    while(answerButtons.firstChild){       //remove all previous buttons
        answerButtons.removeChild(answerButtons.firstChild); //remove all previous answers
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;        // get button that was clicked
    const isCorrect = selectedBtn.dataset.correct === "true";  // get correct answer
    if (isCorrect) {
        selectedBtn.classList.add("correct");   // add correct class to button
        score++;                                // increment score
    }else{
        selectedBtn.classList.add("incorrect");   // add incorrect class to button
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){        // check if button is correct for each data set
            button.classList.add("correct");        // add correct class to button green color
        }
        button.disabled = true;          // disable button after click
    });
    nextButton.style.display = "block";       // show next button
}
function showScore(){
    resetState();                 //remove all previous questions and answers
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions!`;   // display score
    nextButton.innerHTML = "Play Again";                                                       // change button text to restart
    nextButton.style.display = "block";       // show play again button to restart quiz
}
function handleNextButton(){    // handle next button
    currentQuestionIndex++;    // increment question index
    if (currentQuestionIndex < questions.length) {   // handle next question
        showQuestion();      // show next question if there are more questions
    }else{
        showScore();     // show final score
    }
}
nextButton.addEventListener("click", () => {         // handle next button click
    if (currentQuestionIndex < questions.length) {   // handle next question to check if it is full or not
        handleNextButton();        // handle button to next question
    }else{
        startQuiz();     // if no more question it should resart the quiz
    }
});

startQuiz();