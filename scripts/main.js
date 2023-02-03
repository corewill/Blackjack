const dealerHand = document.getElementById("dealer-hand");
const playerHand = document.getElementById("player-hand");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const dealButton = document.getElementById("deal-button");
const dealerScore = document.getElementById("dealer-points");
const playerScore = document.getElementById("player-points");

let deck = [];
const suits = ["hearts", "spades", "clubs", "diamonds"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
let dealercards = [];
let playercards = [];

const shuffle = (arr) => {
  arr.sort(()=> Math.random() - 0.5);

};

const makeDeck = () => {
  for (let suit of suits) {
    for (let rank of ranks) {
      const card = {
        rank: rank,
        suit: suit,
        pointValue: rank > 10 ? 10 : rank,
      };
      deck.push(card);
    }
  }
  shuffle(deck)
  console.log(deck);
};

const getCardFromDeck = () =>{
  return deck.pop()
}

function deal() {
playercards.push(getCardFromDeck())
dealercards.push(getCardFromDeck())
playercards.push(getCardFromDeck())
dealercards.push(getCardFromDeck())
console.log(playercards)
console.log(dealercards)
}


function hit() {
  playercards.push(getCardFromDeck())
  
  if (calculatePoints(playercards) > 21) {
    alert("You Bust")
  
  }

}

const getCardImage = (card) => {
  let cardImg = document.createElement("img"); 
  cardImg.src = `images/${card.rank}_of_${card.suit}.png`; 
  return cardImg
}
const playerCardRender = (arr) => {
arr.forEach((card) => {
  playerHand.append(getCardImage(card))
  calculatePoints(playercards)
});
calculatePoints(arr)
};

const dealerCardRender = (arr) => {
arr.forEach((card) => {
  dealerHand.append(getCardImage(card))
  calculatePoints2(dealercards)
});
};



const faceCardValue = (hand = [], score = 0) => {
  for (const card of hand) {
    switch (card.rank) {
      case "jack":
        score += 10;
        break;
      case "queen":
        score += 10;
        break;
      case "king":
        score += 10;
        break;
      default:
        score += card.pointValue;
      
    }
  }}


const calculatePoints = (arr) => {
  let score = 0;
  
  for (let i=0; i< 2; i++) {
    score += arr[i].pointValue;
    faceCardValue(arr, score)
}
  playerScore.innerText = score
  return score;
}
const calculatePoints2 = (arr) => {
  let score = 0;
  
  for (let i=0; i< 2; i++) {
    score += arr[i].pointValue;
    faceCardValue(arr, score)
}
  dealerScore.innerText = score
  return score;
}

hitButton.addEventListener("click", () =>{
  playerHand.innerHTML = ""
  hit()
  playerCardRender(playercards)
  


  
})
makeDeck()
dealButton.addEventListener("click", () =>{
  deal()
  dealButton.disabled = true;
  playerCardRender(playercards)
  dealerCardRender(dealercards)

  
  
})


