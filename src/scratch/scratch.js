var Hand = require('pokersolver').Hand;


let hand1 = Hand.solve(['Ad', '4c', 'Jc', '3s', '2d']);
console.log(hand1.name, 'jacksbetter');


// const gradeTheHand = function (hand) {
//   return grader(hand);
// }

 // grade(cards){
  //   for(let i = 0; i < cards.length; i++){
  //     if(cards[i].rank === '10'){
  //       cards[i].rank = 'T';
  //     }
  //   }
  //   // console.log(cards);

  //   let holdCards = gradeTheHand(cards);
  //   var keys = Object.keys(holdCards);
  //   let keepers = [];
  //   keys.forEach( function(key) {
  //     let values = holdCards[key]
  //     if(key === "cards"){
  //       values.forEach( function(value) {
  //         let individual = `${value.value}${value.suit}`;
  //         keepers.push(individual);
  //       })
  //     }
  //   });
  //   this.setIdeal(keepers);
  // }

  // setIdeal(keepers){
  //   let keepersSuit = '';
  //   let keepersRank = '';
  //   let keeperArr = [];
  //   let keeperObj = {};
  //   let keeperObjArr = [];
  //   for(let i = 0; i < keepers.length ; i++){
  //     keepersSuit = keepers[i].charAt(keepers[i].length - 1);
  //     keepersRank = keepers[i].charAt(0);
  //     if(keepersRank === 'T'){
  //       keepersRank = '10';
  //     }
  //     keeperArr[i] = keepersRank + keepersSuit;
  //     keeperObj = Object.assign({}, {
  //       rank: keepersRank,
  //       suit: keepersSuit,
  //       held: this.props.held,
  //       ideal: true
  //     })
  //     keeperObjArr.push(keeperObj);
  //   }
  //   console.log(keeperObjArr);
  //   console.log(this.props.cards);
  //   // console.log(keeperArr);
  // }