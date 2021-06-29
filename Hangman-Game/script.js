const wordEl = document.getElementById("word");
const wrongLetterEl = document.getElementById("wrong-letters");
const playAgain = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "program",
  "coding",
  "javascript",
  "hackathon",
  "codeforces",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [],
  wrongLetters = [];

// display words

const dipslayWord = function () {
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `<div class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</div>
      `
    )
    .join("")}
    `;

  const innerText = wordEl.innerText.replace(/\n/g, "");

  if (innerText === selectedWord) {
    finalMessage.innerText = "Congratulations, You Won 😊️!";
    popup.style.display = "flex";
  }
};

dipslayWord();

// update wrong
function updateWrongLettersEl() {
  // display wrong letters
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  // display figures
  const errors = wrongLetters.length;
  figureParts.forEach((el, index) => {
    if (index < errors) {
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });
  if (figureParts.length <= errors) {
    finalMessage.innerText = `Unfortunately, You Lost !!`;
    popup.style.display = "flex";
  }
}

// show notification

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// keydown letter press

window.addEventListener("keydown", (e) => {
  if (e.keyCode > 64 && e.keyCode < 91) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        dipslayWord();
      } else {
        showNotification();
      }
    } else if (wrongLetters.includes(letter)) {
      showNotification();
    } else {
      wrongLetters.push(letter);
      updateWrongLettersEl();
    }
  }
});

// restart game

playAgain.addEventListener("click", () => {
  correctLetters = [];
  wrongLetters = [];
  selectedWord = words[Math.floor(Math.random() * words.length)];
  popup.style.display = 'none';
  dipslayWord();
  updateWrongLettersEl();
});
