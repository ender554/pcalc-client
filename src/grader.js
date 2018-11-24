

export const grader = (input) => {

  console.log(input);
  var Hand = require('pokersolver').Hand;
  let handTransform = [];
  // console.log(handTransform.type);
  let cardString = '';
  for(let i = 0; i < input.length; i++){
    input[i].ideal = true;
    cardString = input[i].rank + input[i].suit.charAt(0);
    console.log(cardString);
    handTransform.push(cardString);
  }
  return (Hand.solve(handTransform, 'jacksbetter'));

}