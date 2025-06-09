let questions = [
    {
        question: "Which Skin Has A Built-In Emote?",
        answers: ["Brite Bomber", "Nog Ops", "Isabella", "Mogul Master"],
        correct: "Isabella"
    },
    {
        question: "Which Skin Was Apart Of A Twitch Pack?",
        answers: ["Havoc", "Stealth Reflex", "Rook", "Leviathan"],
        correct: "Havoc"
    },
    {
        question: "What Skin Came In The First Starter Pack?",
        answers: ["Funk Ops", "Elite Agent", "Rook", "Rogue Agent"],
        correct: "Rogue Agent"
    },
    {
        question: "What Skin Came From Save The World?",
        answers: ["Battle Hawk", "Cloaked Star", "Disco Diva", "Bunker Jonesy"],
        correct: "Cloaked Star"
    },
    {
        question: "What Skin Was The Tier 1 Skin For Season 3?",
        answers: ["John Wick", "Skull Trooper", "Mission Specialist", "Black Knight"],
        correct: "Mission Specialist"
    },
    {
        question: "What Skin Did You Get From The Discovery Challenge In Season 8?",
        answers: ["Ruin", "Lynx", "Zenith", "Trog"],
        correct: "Ruin"
    },
    {
        question: "What Was The Teir 47 Skin In The Season 9 Battle Pass?",
        answers: ["Demi", "Stratus", "Rox", "Vega"],
        correct: "Vega"
    },
    {
        question: "What Skin Was Remade In The Season X Battle Pass?",
        answers: ["Rust Lord", "Renegade Raider", "John Wick", "Royal Knight"],
        correct: "Rust Lord"
    },
    {
        question: "What Skin Rifted From The Real World With A Durr Burger?",
        answers: ["Kevin The Cube", "Ice King", "Drift", "Dusk"],
        correct: "Drift"
    },
    {
        question: "What Skin Did You Get From Collecting All Battle Stars In Season 4?",
        answers: ["Visitor", "Nog Ops", "Recon Expert", "Red Knight"],
        correct: "Visitor"
    }
];

//Question = 0
let current = 0;
let score = 0;

//Get elements from HTML doc
let questionText = document.getElementById("question");
let questionNumber = document.getElementById("question-number");
let answer1 = document.getElementById("answer1");
let answer2 = document.getElementById("answer2");
let answer3 = document.getElementById("answer3");
let answer4 = document.getElementById("answer4");
let result = document.getElementById("result");
let imageContainer = document.getElementById("image-container");

//List of answer buttons
let allButtons = [answer1, answer2, answer3, answer4];

// AI helped debug and fix this function
//Shuffle answer order
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Shows questions and answers
function showQuestion() {
    result.textContent = "";
    imageContainer.innerHTML = "";
    //Shows buttons with answers
    allButtons.forEach(button => {
        button.disabled = false;
        button.style.display = "inline-block";
    });

    //Update question and question number
    let q = questions[current];
    questionText.textContent = q.question;
    questionNumber.textContent = `Question ${current + 1} of ${questions.length}`;

    //Shuffle order of answers
    let shuffledAnswers = [...q.answers];
    shuffle(shuffledAnswers);

    //Change the buttons to the knew question
    for (let i = 0; i < allButtons.length; i++) {
        let newButton = allButtons[i].cloneNode(true);
        newButton.textContent = shuffledAnswers[i];
        newButton.disabled = false;
        newButton.style.display = "inline-block";

        //Event listener that sees if the user clicked the answer
        newButton.addEventListener("click", () => checkAnswer(shuffledAnswers[i]));

        allButtons[i].replaceWith(newButton);
        allButtons[i] = newButton;
    }
}

//Checks if the right button was pressed
function checkAnswer(answer) {
    let correct = questions[current].correct;

    //Disables buttons after the user clicks one
    allButtons.forEach(button => button.disabled = true);

    if (answer === correct) {
        result.textContent = "✅ Correct!";
        score++;
    } else {
        result.textContent = "❌ Wrong! The right answer was " + correct;
    }

    //Waits a 1 second then switches to the next question
    setTimeout(() => {
        current++;
        if (current < questions.length) {
            showQuestion();
        } else {
            showFinalScore();
        }
    }, 1000);
}

//Says how many were correct and then shows default skin
function showFinalScore() {
    questionText.textContent = "🎉 You're done!";
    questionNumber.textContent = "";
    result.textContent = `You got ${score} out of ${questions.length} correct.`;

    //Get rid of answer buttons
    allButtons.forEach(button => button.style.display = "none");

    //Default skin
    imageContainer.innerHTML = "";
    let img = document.createElement("img");
    img.src = "images/skin.jpg";
    img.alt = "Fortnite Logo";
    img.width = 300;
    imageContainer.appendChild(img);
}

shuffle(questions);
showQuestion();
