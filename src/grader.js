

export const grader = (input) => {

  var Hand = require('pokersolver').Hand;
  let handTransform = [];
  let cardString = '';
  for(let i = 0; i < input.length; i++){
    input[i].ideal = true;
    cardString = input[i].rank + input[i].suit.charAt(0);
    handTransform.push(cardString);
  }
  return (Hand.solve(handTransform, 'jacksbetter'));

}