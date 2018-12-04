const { decks } = require('cards');

const deck = new decks.StandardDeck({ jokers: 0 });
console.log(deck);
const hand = deck.draw(5);
console.log(hand);


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

console.log(makeCheckableHand(hand));