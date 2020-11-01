
const questions = [
    {
        "question": "What was Tandem previous name?",
        "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
        "correct": "Devmynd"
    },
    {
        "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
        "incorrect": ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana"],
        "correct": "Et tu, Brute?"
    },
    {
        "question": "A group of tigers are referred to as:",
        "incorrect": ["Chowder", "Pride", "Destruction"],
        "correct": "Ambush"
    },
    {
        "question": "What is the top speed an average cat can travel?",
        "incorrect": ["42 mph", "13 mph", "9 mph"],
        "correct": "31 mph"
    },
    {
        "question": "A cat can jump to _____ times its own height:",
        "incorrect": ["3", "9", "7"],
        "correct": "5"
    },
    {
        "question": "What is the only letter that doesn't appear in a US state name?",
        "incorrect": ["M", "Z", "X"],
        "correct": "Q"
    },
    {
        "question": "What is the name for a cow-bison hybrid?",
        "incorrect": ["Cowson", "Bicow", "Mooson"],
        "correct": "Beefalo"
    },
    {
        "question": "What is the largest freshwater lake in the world?",
        "incorrect": ["Lake Baikal", "Lake Michigan", "Lake Victoria"],
        "correct": "Lake Superior"
    },

    {
        "question": "In a website address bar, what does WWW stand for?",
        "incorrect": ["Wild Wild West", "War World Web"],
        "correct": "World Wide Web"
    },
    {
        "question": "In a game of bingo, what number is represented by the name two little ducks?",
        "incorrect": ["20", "55", "77"],
        "correct": "22"
    },
    {
        "question": "According to Greek mythology, who was the first woman on Earth?",
        "incorrect": ["Lilith", "Eve", "Hera"],
        "correct": "Pandora"
    },
    {
        "question": "In which European city would you find Orly airport?",
        "incorrect": ["London", "Belgium", "Munich"],
        "correct": "Paris"
    },
    {
        "question": "Where would you find the Sea of Tranquility?",
        "incorrect": ["California", "Siberia", "China"],
        "correct": "The Moon"
    },
    {
        "question": "Which artist painted 'Girl with a Pearl Earrin'?",
        "incorrect": ["Van Gogh", "Picasso", "Da Vinci"],
        "correct": "Vermeer"
    },
    {
        "question": "What is the official name for the 'hashtag' symbol?",
        "incorrect": ["Number sign", "Hash Sign", "Pound"],
        "correct": "Octothorpe"
    },
    {
        "question": "Not American at all, where is apple pie from?",
        "incorrect": ["Japan", "Ethiopia", "Canada"],
        "correct": "England"
    },
    {
        "question": "What is the national animal of Scotland?",
        "incorrect": ["Bear", "Rabbit", "Seal"],
        "correct": "Unicorn"
    },
    {
        "question": "Where in the world is the only place where Canada is *due south*",
        "incorrect": ["Alaska", "Russia", "Washington"],
        "correct": "Detroit"
    },
    {
        "question": "Approximately how many grapes go into a bottle of wine?",
        "incorrect": ["500", "200", "1000"],
        "correct": "700"
    },
    {
        "question": "How much does a US One Dollar Bill cost to make?",
        "incorrect": ["$0.25", "$1", "$5"],
        "correct": "$0.05"
    },
    {
        "question": "The Vatican bank has the only ATM in the world that allows users to do what?",
        "incorrect": [
            "Receive withdrawls in rosary beads",
            "Vote for the Pope",
            "Purchase indulgences"
        ],
        "correct": "Perform transactions in Latin"
    }
];

let domElements = {
    makeInput: function (i) {
        let input = document.createElement("input");
        input.setAttribute("id", i);
        input.setAttribute("type", "radio");
        input.setAttribute("name", "radio");
        return input
    },
    makeLabel: function (text, i) {
        let label = document.createElement("label");
        label.setAttribute("class", "radio-label");
        label.setAttribute("for", i);
        let choice = document.createTextNode(text);
        label.appendChild(choice);
        return label
    },
    makeButton: function (buttonText) {
        let button = document.createElement('a');
        button.textContent = buttonText
        return button
    }
}


const randomizedQuestionsArray = randomizeArray(questions, 10);
let questionCounter = 0;
let score = 0;


if (window.location.pathname === '/game.html') { startGame() }

function startGame() {
    getQuestion(randomizedQuestionsArray[questionCounter])
    const gameStats = document.getElementById('status');
    gameStats.style.display = 'block';
}

function getQuestion(question) {
    let questionText = question.question;
    let correctAnswer = question.correct;
    let currentAnswers = buildAnswers(question, correctAnswer);
    displayCard(questionText, currentAnswers, correctAnswer);
}

//randomizes an array to a given max length
function randomizeArray(array, maxLength) {
    let newArray = [];
    while (newArray.length < maxLength) {
        let randomIndex = Math.floor(Math.random() * array.length);
        console.log(randomIndex)
        newArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    };
    return newArray
}

function buildAnswers(question, correctAnswer) {
    let answersArray = question.incorrect;
    answersArray.push(correctAnswer);
    let randomizedAnswers = randomizeArray(answersArray, answersArray.length);
    return randomizedAnswers
}

function displayCard(currentQuestion, answersArray, correctAnswer) {
    let question = document.getElementById('question');
    let answersUl = document.getElementById('answers');
    let cardButton = document.getElementById('cardBtn');
    let questionNum = document.getElementById('questionNumber');

    card.style.display = 'block';
    answersUl.innerHTML = '';
    cardButton.innerHTML = '';
    questionNum.textContent = `${questionCounter + 1} of ${randomizedQuestionsArray.length}`
    question.textContent = currentQuestion;


    for (let i = 0; i < answersArray.length; i++) {
        let li = document.createElement("li");
        let answerText = answersArray[i];

        let input = domElements.makeInput(i);
        input.textContent = answerText;

        li.appendChild(input);

        let label = domElements.makeLabel(answerText, i);
        li.appendChild(label);
        answersUl.appendChild(li);
    }

    let submitButton = domElements.makeButton("Submit");
    submitButton.id = "submitButton";
    cardButton.appendChild(submitButton);

    let nextButton = domElements.makeButton("Next");
    nextButton.id = "nextBtn";

    submitButton.addEventListener('click', (e) => {
        let choices = answersUl.getElementsByTagName('input');
        let selectedAnswer = getAnswerChoice(choices);
        let answerResult = answerCheck(selectedAnswer, correctAnswer);
        if (e.target === submitButton && questionCounter + 1 !== randomizedQuestionsArray.length) {
            submitButton.style.display = 'none';
            if (answerResult === true || answerResult === false) {
                cardButton.appendChild(nextButton);
                nextButton.style.display = 'block';
                reviewAnswerChoice(choices, selectedAnswer, correctAnswer, answerResult)
            } else if (answerResult === undefined) {
                submitButton.style.display = 'block';
                reviewAnswerChoice(choices, selectedAnswer, correctAnswer, answerResult);
            }
        } else {
            submitButton.style.display = 'none';
            reviewAnswerChoice(choices, selectedAnswer, correctAnswer, answerResult);
            let finishButton = domElements.makeButton('Finish');
            finishButton.id = "finishBtn";
            finishButton.href = '/end.html'
            cardBtn.appendChild(finishButton);
        }
        nextButton.addEventListener('click', (e) => {
            questionCounter++
            if (questionCounter !== randomizedQuestionsArray.length) {
                getQuestion(randomizedQuestionsArray[questionCounter])
                nextButton.style.display = 'none';
            }
        });

    });
};


function getAnswerChoice(choices) {
    for (i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            let selection = choices[i].textContent;
            return selection;
        };
    };
};

answerCheck = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
        score++
        localStorage.setItem('score', JSON.stringify(score));
        return true
    } else if (selectedAnswer === undefined) {
        return undefined
    } else {
        return false
    }
}

reviewAnswerChoice = (choices, selectedAnswer, correctAnswer, status) => {
    if (status === undefined) {
    } else {
        for (i = 0; i < choices.length; i++) {
            if (choices[i].textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
                choices[i].nextSibling.classList.add("wrong");
            } else if (choices[i].textContent === correctAnswer) {
                choices[i].nextSibling.classList.add("correct");
            }
        }
    }
}




