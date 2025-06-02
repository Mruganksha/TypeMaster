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

async function fetchSentence() {
  try {
    const res = await fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=1");
    const data = await res.json();
    const fullText = data.slice(0, 2).join(" ");
    const trimmedText = fullText.length > 300 ? fullText.slice(0, 300) : fullText;
    const sentences = trimmedText.match(/[^\.!\?]+[\.!\?]+/g); 
    const longSentence = sentences ? sentences.join(" ").trim() : trimmedText;
    return longSentence;
  } catch (error) {
    console.error("Error fetching the sentence:", error);
    return "Default fallback sentence if API fails.";
  }
}

function calculateWPM(typedText, seconds) {
  const words = typedText.trim().split(/\s+/).length;
  return seconds > 0 ? Math.round((words / seconds) * 60) : 0;
}

async function startTest() {
  currentSentence = await fetchSentence(); 
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

   const timeTaken = parseInt(time1.textContent);
  const wpm = calculateWPM(typedText, timeTaken);
  document.getElementById("wpm").textContent = wpm;

  if (accuracy === 100 && typedText.length === currentSentence.length) {
    message.textContent = "Congratulations! You are perfect!";
    message.style.color = "green";
  } else {
    message.textContent = "Better luck next time!";
    message.style.color = "red";
  }

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
