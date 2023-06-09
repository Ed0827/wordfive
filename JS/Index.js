const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game is over.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    let correct_answer = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const input_letter = block.innerText;
      const answer_letter = answer[i];
      if (input_letter === answer_letter) {
        correct_answer += 1;
        block.style.background = "#538D4E";
      } else if (answer.includes(input_letter))
        block.style.background = "#B49F3A";
      else block.style.background = "#3A3A3C";
      block.style.color = "white";
    }

    if (correct_answer === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

const startTimer = () => {
  const time_start = new Date();

  function setTime() {
    const current_time = new Date();
    const spending_time = new Date(current_time - time_start);
    const minute = spending_time.getMinutes().toString().padStart(2, "0");
    const second = spending_time.getSeconds().toString().padStart(2, "0");
    const timeDiv = document.querySelector("#timer");
    timeDiv.innerText = `${minute}:${second}`;
  }

  //periodic
  timer = setInterval(setTime, 1000);
  console.log(timer);
};

startTimer();
appStart();
