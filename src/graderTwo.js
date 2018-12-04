import {jacksOrBetter} from './jacksOrBetter';

export const graderTwo = (input) => {
  let gradable = format(input);
  jacksOrBetter(gradable);
  return gradable;
}

const format = (input) => {
  let gradable = [];
  let card = {};
  for (let i = 0; i < input.length; i++){
    card = {suit: input[i].suit.charAt(0),
      rank: input[i].rank
    }
    gradable.push(card);
  }
  return gradable;
}