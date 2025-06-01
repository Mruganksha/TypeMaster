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

    let currentSentence = "";
    let startTime;
    let timerInterval;

    function startTest() {
      currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
      sentencel.textContent = currentSentence;

      inputl.value = "";
      inputl.disabled = false;
      inputl.focus();
      time1.textContent = "0";
      accuracyl.textContent = "0";

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
    const minLength = Math.min(typedText.length, currentSentence.length);

    for (let i = 0; i < minLength; i++) {
      if (typedText[i] === currentSentence[i]) {
      correctChars++;
      }
    }

    const accuracy = typedText.length > 0
    ? Math.round((correctChars / typedText.length) * 100)
    : 0;

    accuracyl.textContent = accuracy;

    const message = document.getElementById("message");
    if (accuracy === 100) {
     message.textContent = "Congratulations! You are perfect!";
     message.style.color = "green";
    } else {
     message.textContent = "Better luck next time!";
     message.style.color = "red";
    }
  }


    startBtn.addEventListener("click", startTest);
    stopBtn.addEventListener("click", stopTest);