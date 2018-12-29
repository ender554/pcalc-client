import {jacksOrBetterIdeal} from './jacksOrBetter';
import {deucesWildIdeal} from './deucesWild';
export const grader = (input, type) => {
  let idealCards;
  const rankToBinary = {
    "2": 1, "3": 2, "4": 4, "5": 8, "6": 16, "7": 32, "8": 64, "9": 128, "T": 256,
    "J": 512, "Q": 1024, "K": 2048, "A": 4096
  };
  const suitToBinary = {
    "clubs": 1, "spades": 2, "hearts": 4, "diamonds": 8
  };
  console.log(type);
  const heldCards = [];
  let suitArray = [0,0,0,0,0];
  let rankArray = [0,0,0,0,0];
  for(let i = 0; i < input.length; i++){
    suitArray[i] = suitToBinary[input[i].suit];
    rankArray[i] = rankToBinary[input[i].rank];
  }
  if(type === 'jacksOrBetter'){
    idealCards = jacksOrBetterIdeal(suitArray, rankArray);
  }
  
  if(type === 'deucesWild'){
    idealCards = deucesWildIdeal(suitArray, rankArray);
  }

  if(idealCards){
    for(let j = 0; j < idealCards.length; j++){
      input[idealCards[j]].ideal = true;
    }
  }
  for(let i = 0; i < input.length; i++){
    heldCards.push(input[i]);
  }

  
  return heldCards;
}
