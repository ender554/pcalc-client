

export const grader = (input) => {
  let winners = input.map(x => x);
  const winnerArr = [];
  winners = setFormat(wholeThing(makeCheckableHand(winners)));
  let formattedWinners = winners.map(x => x);
  for(let i = 0; i < formattedWinners.length; i++){
    winnerArr.push(formattedWinners[i]);
  }
  winners = expandSuit(winners);
  
  for(let i = 0; i < input.length; i++){
    if(input[i].rank === 'T'){
      input[i].rank = '10';
    }
  }
  
  for(let j = 0; j < input.length; j++){
    for(let i = 0; i < winnerArr.length; i++){
      if((winnerArr[i].suit === input[j].suit) && (winnerArr[i].rank === input[j].rank)){
        input[j].ideal = true;
      }
    }
  }
  return input;

}

const makeCheckableHand = (input) => {
  var Hand = require('pokersolver').Hand;
  let handTransform = [];
  let cardString = '';
  for (let i = 0; i < input.length; i++) {
    if (input[i].rank === '10') {
      input[i].rank = 'T';
    }
  }
  for (let i = 0; i < input.length; i++) {
    cardString = input[i].rank + input[i].suit.charAt(0);
    handTransform.push(cardString);
  }

  return (Hand.solve(handTransform, 'jacksbetter'));
}

const wholeThing = (input) => {
  let holdCards = input;
  var keys = Object.keys(holdCards);
  let keepers = [];
    keys.forEach( function(key) {
      let values = holdCards[key]
      if(key === "cards"){
        values.forEach( function(value) {
          let individual = `${value.value}${value.suit}`;
          keepers.push(individual);
        })
      }
    });
    return (keepers);
}

const setFormat = (keepers) => {
    let keepersSuit = '';
    let keepersRank = '';
    let keeperArr = [];
    let keeperObj = {};
    let keeperObjArr = [];
    for(let i = 0; i < keepers.length ; i++){
      keepersSuit = keepers[i].charAt(keepers[i].length - 1);
      keepersRank = keepers[i].charAt(0);
      if(keepersRank === 'T'){
        keepersRank = '10';
      }
      keeperArr[i] = keepersRank + keepersSuit;
      keeperObj = Object.assign({}, {
        rank: keepersRank,
        suit: keepersSuit
      })
      keeperObjArr.push(keeperObj);
    }
    return keeperObjArr;
  }

  const expandSuit = (arrOfCards) => {
    for(let i = 0; i < arrOfCards.length; i++){
      if(arrOfCards[i].suit === 's'){
        arrOfCards[i].suit = 'spades'
      }else if(arrOfCards[i].suit === 'c'){
        arrOfCards[i].suit = 'clubs'
      }else if(arrOfCards[i].suit === 'h'){
        arrOfCards[i].suit = 'hearts'
      }else if(arrOfCards[i].suit === 'd'){
        arrOfCards[i].suit = 'diamonds'
      }
    }


    console.log(arrOfCards);
    return arrOfCards;
  }