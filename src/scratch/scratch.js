var Hand = require('pokersolver').Hand;


let hand1 = Hand.solve(['Ad', '4c', 'Jc', '3s', '2d']);
console.log(hand1.name, 'jacksbetter');