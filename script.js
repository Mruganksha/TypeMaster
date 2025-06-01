const sentences = [
  "JavaScript is a versatile language used for both frontend and backend development.",
  "Typing tests help improve speed, accuracy, and overall confidence in keyboard usage.",
  "Consistent practice is the key to becoming a proficient and confident coder.",
  "Front-end development involves HTML, CSS, JavaScript, and frameworks like React.",
  "Debugging code is a crucial skill that separates good developers from great ones."
];

const sentencel = document.getElementById("sentence");
const inputl = document.getElementById("input");
const time1 = document.getElementById("time");
const accuracyl = document.getElementById("accuracy");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const message = document.getElementById("message");

let currentSentence = "";
let startTime;
let timerInterval;

function renderSentence(sentence) {
  sentencel.innerHTML = "";
  sentence.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;
    span.setAttribute("data-index", index);
    sentencel.appendChild(span);
  });
}

function startTest() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  renderSentence(currentSentence);

  inputl.value = "";
  inputl.disabled = false;
  inputl.focus();
  time1.textContent = "0";
  accuracyl.textContent = "0";
  message.textContent = "";

  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
    time1.textContent = secondsPassed;
  }, 1000);
}

function stopTest() {
  clearInterval(timerInterval);
  inputl.disabled = true;

  const typedText = inputl.value;
  let correctChars = 0;

  const spans = sentencel.querySelectorAll("span");
  spans.forEach((span, index) => {
    const char = typedText[index];
    if (char == null) {
      span.className = "";
    } else if (char === span.innerText) {
      span.className = "correct";
      correctChars++;
    } else {
      span.className = "incorrect";
    }

    if (index === typedText.length) {
      span.classList.add("current");
    } else {
      span.classList.remove("current");
    }
  });

  const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

  accuracyl.textContent = accuracy;

  if (accuracy === 100 && typedText.length === currentSentence.length) {
    message.textContent = "Congratulations! You are perfect!";
    message.style.color = "green";
  } else {
    message.textContent = "Better luck next time!";
    message.style.color = "red";
  }
}

inputl.addEventListener("input", () => {
  const typedText = inputl.value;
  const spans = sentencel.querySelectorAll("span");

  let correctChars = 0;

  spans.forEach((span, index) => {
    const char = typedText[index];
    if (char == null) {
      span.className = "";
    } else if (char === span.innerText) {
      span.className = "correct";
      correctChars++;
    } else {
      span.className = "incorrect";
    }

    if (index === typedText.length) {
      span.classList.add("current");
    } else {
      span.classList.remove("current");
    }
  });

  if (typedText === currentSentence) {
    stopTest();
  }
});

startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);
