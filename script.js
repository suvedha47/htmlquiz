 const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperloop Machine Language",
        "None of the above"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which language is used for styling web pages?",
      options: ["HTML", "JQuery", "CSS", "XML"],
      answer: "CSS"
    },
    {
      question: "Which is not a JavaScript Framework?",
      options: ["React", "Angular", "Vue", "Django"],
      answer: "Django"
    },
    {
      question: "Which is used for Connect To Database?",
      options: ["PHP", "HTML", "JS", "All"],
      answer: "PHP"
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<br>", "<break>", "<lb>", "<newline>"],
      answer: "<br>"
    },
    {
      question: "Which attribute is used in HTML for link?",
      options: ["scr", "href", "link", "rel"],
      answer: "href"
    },
    {
      question: "Which symbol is used to select an ID in CSS?",
      options: [".", "#", "*", "@"],
      answer: "#"
    },
    {
      question: "Which CSS property controls the size of text?",
      options: ["font-style", "text-size", "font-size", "text-style"],
      answer: "font-size"
    },
    {
      question: "How do you write a comment in Javascript?",
      options: ["<!--comment-->", "/*comment*/", "//comment", "**comment**"],
      answer: "//comment"
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      options: ["=", "==", "===", ":="],
      answer: "="
    },
    {
      question: "How do you call a function named greet?",
      options: ["call greet()", "greet[]", "greet()", "function.greet()"],
      answer: "greet()"
    },
    {
      question: "Which operator is used to select an class in CSS ?",
      options: [".", "#", "*", "="],
      answer: "."
    }

  ];

  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;

  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  const scoreEl = document.getElementById("score");
  const timerEl = document.getElementById("timer");

  function startQuiz() {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
  }

  function loadQuestion() {
    clearState();
    startTimer();
    let q = questions[currentQuestion];
    questionEl.textContent = q.question;

    q.options.forEach(option => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => selectAnswer(li, q.answer));
      optionsEl.appendChild(li);
    });
  }

  function selectAnswer(selectedOption, correctAnswer) {
    stopTimer();
    const options = optionsEl.querySelectorAll("li");
    options.forEach(option => {
      option.style.pointerEvents = "none";
      if (option.textContent === correctAnswer) {
        option.classList.add("correct");
      } else {
        option.classList.add("wrong");
      }
    });

    if (selectedOption.textContent === correctAnswer) {
      score++;
    }

    nextBtn.style.display = "inline-block";
  }

  function clearState() {
    nextBtn.style.display = "none";
    optionsEl.innerHTML = "";
    scoreEl.textContent = "";
    timerEl.textContent = "Time Left: 15s";
    timeLeft = 15;
  }

  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });

  function showScore() {
    clearState();
    questionEl.textContent = "Quiz Completed!";
    scoreEl.textContent = `Your Score: ${score} out of ${questions.length}`;
    nextBtn.textContent = "Play Again";
    nextBtn.style.display = "inline-block";
    nextBtn.onclick = () => location.reload();
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timer);
        autoSkip();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function autoSkip() {
    const options = optionsEl.querySelectorAll("li");
    options.forEach(option => {
      option.style.pointerEvents = "none";
      if (option.textContent === questions[currentQuestion].answer) {
        option.classList.add("correct");
      }
    });
    nextBtn.style.display = "inline-block";
  }