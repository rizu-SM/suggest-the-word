const question = "Ce qui ne se ...... pas se perd !";
const answer = "partage";
let currentAnswer = "";

document.querySelector("#question-text").innerHTML = question;

// 1. cerate answer slots
const nbrSlot = answer.length;
const slotsContainer = document.querySelector(".answer-slots");
for (let i = 0; i < nbrSlot; i++) {
  const slotElement = document.createElement("div");
  slotElement.className = "slot";
  slotElement.dataset.slotIndex = i;

  slotsContainer.appendChild(slotElement);
}

// 2. create the letters (button)
const answerLetters = answer.toLocaleUpperCase().split("");
// add more random letters
const radomLetters = [];
const rest = 15 - answer.length;
for (let i = 0; i < rest; i++) {
  const l = getRandomLetter();
  radomLetters.push(l);
}

const allLetters = [...answerLetters, ...radomLetters];

// 3. mix (shuffle) the letters
allLetters.sort((a, b) => Math.random() - 0.5);

const lettersContainer = document.querySelector("#letters-grid");
for (let l of allLetters) {
  const letterBtn = document.createElement("button");
  letterBtn.className = "letter-btn";
  letterBtn.innerText = l;

  // add event listeners
  letterBtn.addEventListener("click", function () {
    if (currentAnswer.length >= answer.length) {
      return;
    }
    if(letterBtn.classList.contains("used")){
      alert("chose other letter ")
      return;
    }
    currentAnswer += l;
    const slotIndex = currentAnswer.length - 1;

    const slot = document.querySelector(
      `[data-slot-index="${slotIndex}"].slot`
    );
    slot.innerHTML = l;

    letterBtn.classList.add("used");

    // check game status
    if (currentAnswer === answer.toUpperCase()) {
      alert("Correct!");
    } else if (currentAnswer.length === answer.length) {
      alert("Try again : (");
    }
  });
  // add it to the parent
  lettersContainer.append(letterBtn);
}

function getRandomLetter() {
  const randomNumber = Math.floor(Math.random() * 26);
  const radomLetter = String.fromCharCode(randomNumber + 65);

  return radomLetter;
}
const deletbtn=document.querySelector('.sup');


function supprimer() {
  if (currentAnswer.length === 0) return;

  const lastLetter = currentAnswer[currentAnswer.length - 1];
  currentAnswer = currentAnswer.slice(0, -1);
  const slotIndex = currentAnswer.length;
  const slot = document.querySelector(`[data-slot-index="${slotIndex}"].slot`);
  slot.innerHTML = "";

  const usedButtons = document.querySelectorAll(".letter-btn.used");
  for (let btn of usedButtons) {
    if (btn.innerText === lastLetter) {
      btn.classList.remove("used");
      break;
    }
  }
}
deletbtn.addEventListener('click',supprimer);


function reset() {
  if (currentAnswer.length === 0) return;
  

  currentAnswer = "";

  const usedButtons = document.querySelectorAll(".letter-btn.used");
  
  for (let i = 0; i < usedButtons.length; i++) {
    usedButtons[i].classList.remove("used");
  }

  const slots = document.querySelectorAll(".slot");
  for (let i = 0; i < slots.length; i++) {
    slots[i].innerHTML = "";
  }
}

 const wiwi=document.querySelector('.res');
 wiwi.addEventListener('click',reset);

 function addletter(){
  const overflow =[];
  for (let i = 0; i < 5; i++) {
    const l = getRandomLetter();
    overflow.push(l);
  }
  overflow.sort((a, b) => Math.random() - 0.5);
    const lettersContainer = document.querySelector("#letters-grid");
    for (let l of overflow) {
      const letterBtn = document.createElement("button");
      letterBtn.className = "letter-btn";
      letterBtn.innerText = l;
    
      // add event listeners
      letterBtn.addEventListener("click", function () {
        if (currentAnswer.length >= answer.length) {
          return;
        }
        if(letterBtn.classList.contains("used")){
          alert("chose other letter ")
          return;
        }
        currentAnswer += l;
        const slotIndex = currentAnswer.length - 1;
    
        const slot = document.querySelector(
          `[data-slot-index="${slotIndex}"].slot`
        );
        slot.innerHTML = l;
    
        letterBtn.classList.add("used");
    
        // check game status
        if (currentAnswer === answer.toUpperCase()) {
          alert("Correct!");
        } else if (currentAnswer.length === answer.length) {
          alert("Try again : (");
        }
      });
      // add it to the parent
      lettersContainer.append(letterBtn);
    }
}
 const more = document.querySelector('.more');
 more.addEventListener('click',addletter);
