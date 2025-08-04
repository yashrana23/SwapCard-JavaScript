let match = document.querySelector("#match-count");
let turn = document.querySelector("#turn-count");
let msg = document.querySelector("#msg");
const newGameBtn = document.querySelector("#new-btn");
const cards = document.querySelectorAll(".card");
// const cardImgs = document.querySelectorAll(".card-img");
const result = document.querySelector(".result");

let matchCount = 0;
let turnCount = 0;
let totalTurn = 25;
let playGame = true;
let imgs = [
  "naruto-card.png",
  "kakashi-card.png",
  "luffy-card.png",
  "zoro-card.png",
  "ichigo-card.png",
  "aizen-card.png",
  "goku-card.png",
  "vegeta-card.png",
  "gojo-card.png",
  "eren-card.png",
  "jinwoo-card.png",
  "tanjiro-card.png",
];
let imgPath = "./assets/images/";
let randomImgs = [];
let firstCard;
let secondCard;
let isProcessing = false;
const defaultImg = imgPath + "ryuk-card.png";

function generateRandomCardPosition() {
  const copyPair = [...imgs, ...imgs];

  for (let i = copyPair.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyPair[i], copyPair[j]] = [copyPair[j], copyPair[i]];
  }
  randomImgs = copyPair;
  console.log(randomImgs);
}

function restoreDefaultCard() {
  cards.forEach((card) => {
    const cardImg = card.firstElementChild;
    const cardImgName = cardImg.getAttribute("src");
    card.classList.remove("card-swap");
    cardImg.classList.remove("card-img-swap");
    cardImg.setAttribute("src", defaultImg);
    cardImg.style.visibility = "visible";
    // card.style.backgroundColor = "#9e9e9e";
    card.classList.remove("card-disabled");
    card.disabled = false;
  });
}

function newGame() {
  matchCount = 0;
  turnCount = 0;
  totalTurn = 25;
  playGame = true;
  randomImgs = [];
  firstCard = undefined;
  secondCard = undefined;
  isProcessing = false;
  match.innerHTML = "0";
  turn.innerHTML = "25";
  msg.innerHTML = "";
  result.classList.add("result-disabled");
  restoreDefaultCard();
  generateRandomCardPosition();
}

function checkResult() {
  if (matchCount === 12) {
    msg.innerHTML = "Congratulation, you won!";
    msg.style.color = "#008000";
    result.classList.remove("result-disabled");
    playGame = false;
  } else if (turnCount >= totalTurn) {
    msg.innerHTML = "You lost!, play again...";
    msg.style.color = "#b0413e";
    result.classList.remove("result-disabled");
    playGame = false;
  }
}

function checkMatch(card1, card2) {
  const firstCardImg = card1.firstElementChild;
  const secondCardImg = card2.firstElementChild;
  const firstCardImgName = firstCardImg.getAttribute("src");
  const secondCardImgName = secondCardImg.getAttribute("src");

  // If both card match
  // console.log(firstCardImgName, secondCardImgName);
  if (firstCardImgName === secondCardImgName) {
    firstCardImg.style.visibility = "hidden";
    // card1.style.backgroundColor = "#00000066";
    card1.classList.add("card-disabled");
    card1.disabled = true;

    secondCardImg.style.visibility = "hidden";
    // card2.style.backgroundColor = "#00000066";
    card2.classList.add("card-disabled");
    card2.disabled = true;

    matchCount++;
    match.innerHTML = matchCount;

    firstCard = undefined;
    secondCard = undefined;
    isProcessing = false;
  } else {
    // If both card does't match
    setTimeout(() => {
      card1.classList.remove("card-swap");
      firstCardImg.classList.remove("card-img-swap");
      firstCardImg.setAttribute("src", defaultImg);
      card1.disabled = false;

      card2.classList.remove("card-swap");
      secondCardImg.classList.remove("card-img-swap");
      secondCardImg.setAttribute("src", defaultImg);
      card2.disabled = false;

      firstCard = undefined;
      secondCard = undefined;
      isProcessing = false;
    }, 1000);
  }

  turn.innerHTML = `${totalTurn - turnCount}`;
  // check win or lose, if match === 12 or turnCount >= 25
  checkResult();
}

newGameBtn.addEventListener("click", newGame);

function handleCardClick(card, idx) {
  if (!playGame || isProcessing || card.disabled) return;

  const img = card.firstElementChild;

  img.setAttribute("src", imgPath + randomImgs[idx]);
  card.classList.add("card-swap");
  img.classList.add("card-img-swap");
  card.disabled = true;

  if (!firstCard) {
    firstCard = card;
    console.log("First card selected:", firstCard);
  } else if (!secondCard && card !== firstCard) {
    secondCard = card;
    console.log("Second card selected:", secondCard);

    isProcessing = true;
    turnCount++;

    // if both card exist
    setTimeout(() => {
      checkMatch(firstCard, secondCard);
    }, 500);
  }
}

if (playGame) {
  generateRandomCardPosition();

  cards.forEach((card, idx) => {
    card.addEventListener("click", () => handleCardClick(card, idx));
  });
}
