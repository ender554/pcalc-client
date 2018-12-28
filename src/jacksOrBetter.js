import {printWinningCombinationOdds} from './jorb';
export const jacksOrBetter = (input) => {
  const rankToBinary = {
    "2": 1, "3": 2, "4": 4, "5": 8, "6": 16, "7": 32, "8": 64, "9": 128, "10": 256,
    "J": 512, "Q": 1024, "K": 2048, "A": 4096
  };
  const suitToBinary = {
    "clubs": 1, "spades": 2, "hearts": 4, "diamonds": 8
  };
  const binaryToRank= {
    1: "2", 2: "3",4: "4",8: "5",16: "6",32: "7", 64: "8",128: "9", 256: "10",
    512: "J", 1024: "Q", 2048: "K", 4096: "A"
  };

  const binaryToSuit = {
    1: "clubs", 2: "spades", 4: "hearts", 8: "diamonds"
  };

  const heldCards = [];
  let suitArray = [0,0,0,0,0];
  let rankArray = [0,0,0,0,0];
  for(let i = 0; i < input.length; i++){
    suitArray[i] = suitToBinary[input[i].suit];
    rankArray[i] = rankToBinary[input[i].rank];
  }
  console.log(suitArray);
  console.log(rankArray);
  //:TODO
  //input = array of card objects with suit rank, held, ideal

  //want to change the state of each cards ideal value
  const idealCards = printWinningCombinationOdds(suitArray, rankArray);
  for(let j = 0; j < idealCards.length; j++){
    let card = {
      rank: input[idealCards[j]].rank,
      suit: input[idealCards[j]].suit
    }
    heldCards.push(card)
  }

  
  console.log(heldCards);
  return heldCards;
}



//jacks or better strategy
/*----------------------TO DO-------------------------/
Hand Type, (expected return)
Dealt royal flush (800.0000)
Dealt straight flush (50.0000)
Dealt four of a kind (25.0000)
4 to a royal flush (18.3617)
Dealt full house (9.0000)
Dealt flush (6.0000)
3 of a kind (4.3025)
Dealt straight (4.0000)
4 to a straight flush (3.5319)
Two pair (2.59574)
High pair (1.5365)
3 to a royal flush (1.2868) A
4 to a flush (1.2766)
Unsuited TJQK(0.8723)
Low pair (0.8237)
4 to an outside straight with 0-2 high cards(0.6809)
3 to a straight flush (type 1) (0.6207 to 0.6429)
Suited QJ (0.6004)B
4 to an inside straight, 4 high cards (0.5957)
Suited KQ or KJ (0.5821)
Suited AK, AQ, or AJ (0.5678)
4 to an inside straight, 3 high cards (0.5319)
3 to a straight flush (type 2) (0.5227 to 0.5097)C
Unsuited JQK (0.5005)
Unsuited JQ (0.4980)
Suited TJ (0.4968) D
2 unsuited high cards king highest (0.4862)
Suited TQ (0.4825) E
2 unsuited high cards ace highest (0.4743)
J only (0.4713)
Suited TK (0.4682) F
Q only (0.4681)
K only (0.4649)
A only (0.4640)
3 to a straight flush (type 3) (0.4431)
Garbage, discard everything (0.3597)
---------------------------------------------------------*/