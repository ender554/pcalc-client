
const pairBuckets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function resetPairBuckets() {
  for (let i = 0; i < pairBuckets.length; i++) {
    pairBuckets[i] = 0;
  }
}

function findHammingDistance(value) {
  let count = 0;
  while (value !== 0) {
    if (value & 1) {
      return count;
    }
    value >>= 1;
    count++;
  }
}

function orArray(array, comparison = 0) {
  let combined = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] > comparison)
      combined |= array[i];
  }
  return combined;
}

function deuceCount(cards) {
  let count = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] & 1) {
      count++;
    }
  }
  return count;
}

function pairs(cards, mask) {
  let returnArray = [];
  for (let i = 0; i < cards.length; i++) {
    if (cards[i] & mask) {
      returnArray.push(i);
    }
  }
  return returnArray;
}

// function removeDeuces(cards){
//   let returnArray = [];
//   for(let i = 0; i < cards.length; i++){
//     if(cards[i] !== 1){
//       returnArray.push(cards[i]);
//     }
//   }
//   return returnArray;
// }

function patFourSet(rank) {
  let returnArray = [];
  resetPairBuckets();
  let i;
  for (i = 0; i < rank.length; i++) {
    pairBuckets[findHammingDistance(rank[i])]++;
  }
  for (i = 1; i < pairBuckets.length; i++) {
    if (pairBuckets[i] > 1) {
      returnArray = pairs(rank, 1 << i);
    }
  }
  for (i = 0; i < rank.length; i++) {
    if (rank[i] & 1) {
      returnArray.push(i);
    }
  }
  return returnArray;
}

function royal4PlusSet(rank, suit) {
  let returnArray = [];
  let royalCheck = [];
  for (let i = 0; i < rank.length; i++) {
    if (rank[i] > 128) {
      royalCheck.push(i);
    }
  }
  if (royalCheck.length === 2) {
    if (suit[royalCheck[0]] & suit[royalCheck[1]]) {
      returnArray.push(suit[royalCheck[0]]);
      returnArray.push(suit[royalCheck[1]]);
    }
  }
  else if (royalCheck.length === 3) {
    if (suit[royalCheck[0]] & suit[royalCheck[1]] & suit[royalCheck[2]]) {
      return [0, 1, 2, 3, 4];
    }
  }
  return returnArray;
}

function fourToStraightSet(rank, suit) {
  //4 to a straight flush 6-7, 7-8., ++ and higher
  let returnArray = [];
  //
}

function bestHandThree(rank, suit) {
  let returnArray = [];
  //royal flush
  for (let i = 0; i < rank.length; i++) {
    if (rank[i] > 128) {
      returnArray.push(i);
    }
  }
  if (returnArray.length > 1) {
    if (suit[returnArray[0]] & suit[returnArray[1]]) {
      return [0, 1, 2, 3, 4];
    }
  }

  //3 deuces
  return pairs(rank, 1);
}

function bestHandTwo(rank, suit) {
  let i;
  //Any pat four of a kind or higher
  let returnArray = [];
  returnArray = patFourSet(rank);
  if (returnArray) {
    return returnArray;
  }

  // 4 to a royal flush or "better"
  returnArray = royal4PlusSet(rank, suit);
  if (returnArray) {
    return returnArray;
  }

  // 4 to a straight flush with 2 consecutive singletons, 6-7 or higher
  returnArray = fourToStraightSet(rank, suit);
  if(returnArray){
    return returnArray;
  }

  // 2 deuces only

  return pairs(rank, 1);
}

function deucesWildIdeal(suitsHeld, valuesHeld) {
  let deucesCount = deuceCount(valuesHeld);

  switch (deucesCount) {
    case 4:
      return pairs(valuesHeld, 1);
    case 3:
      return bestHandThree(valuesHeld, suitsHeld);
    case 2:
      return bestHandTwo(valuesHeld, suitsHeld);
    case 1:
      break;
    default:
      return null;
  }
}


export { deucesWildIdeal };