const binaryToSuit = {1 : 'Clubs', 2 : 'Spades', 4 : 'Hearts', 8 : 'Diamonds'};
const binaryToValue = {1:2, 2:3, 4:4, 8:5, 16:6, 32:7, 64:8, 128:9, 256:10, 512:'Jack', 1024:'Queen', 2048:'King', 4096: 'Ace'};
const binaryArray = [1,2,4,8,16,32,64,128,256,512,1024,2048, 4096];
const typeArray = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];
const suitSize = 13;
const pairBuckets = [0,0,0,0,0,0,0,0,0,0,0,0,0];
const flushBuckets = [0,0,0,0];
//clubs, spades, hearts, diamonds
const currentDeckArray = [8191, 8191, 8191, 8191];

function currentCardsHeld(suitsHeld, valuesHeld){
  for(let i = 0 ; i < suitsHeld.length; i++){
    console.log(binaryToValue[parseInt(valuesHeld[i])] + ' of ' + binaryToSuit[parseInt(suitsHeld[i])]);
  }
}

function removeDrawnCardsFromDeck(suitsHeld, valuesHeld){
  let value;
  for(let i = 0; i < suitsHeld.length; i++){
    value = parseInt(valuesHeld[i]);
    switch(parseInt(suitsHeld[i])) {
      case 1:
        currentDeckArray[0] ^= value;
        break;
      case 2:
        currentDeckArray[1] ^= value;
        break;
      case 4:
        currentDeckArray[2] ^= value;
        break;
      case 8:
        currentDeckArray[3] ^= value; 
        break;
      default:
        console.log('somethin broke');
    }
  }
}

function printLeftoverCardsInDeck(){
  let bit = 0;
  for(let i = 0; i < currentDeckArray.length; i++){
    let string = typeArray[i] + ': ';
    for(let j = 0; j < suitSize; j++){
      //if both bits are on then card is in deck. otherwise card has been taken out.
      bit = currentDeckArray[i] & binaryArray[j];
      if(bit){
        string += binaryToValue[binaryArray[j]] + ', ';
      }
      bit = 0;
    }
    console.log(string);
  }
}

function royalFlushChance(){
  const bitmaskArray = [256, 512, 1024, 2048, 4096];
  let counter = 0;
  let min = 5;
  let cardType = 0;
  for(let i = 0; i < currentDeckArray.length; i++){
    for(let j = 0; j < bitmaskArray.length; j++){
      if(bitmaskArray[j] & currentDeckArray[i]){
        counter++;
      }
    }
    if(counter < min){
      min = counter;
      cardType = i;
    }
    counter = 0;
  }
  console.log('You need ' + min + ' more cards from the ' +typeArray[cardType] + ' suit');
  let string = '';
  for(let i = 8; i < binaryArray.length; i++){
    if(currentDeckArray[cardType] & binaryArray[i]){
      string += binaryToValue[binaryArray[i]] + ', ';
    }
  }
  console.log('cards missing are: ' + string);
}

function pairsChance(suitsHeld, valuesHeld){
  let counter = 1;
  let max = 1;
  for(let i = 0; i < valuesHeld.length-1; i++){
    for(let j = i+1; j < valuesHeld.length; j++){
      if(valuesHeld[i] & valuesHeld[j]){
        counter++;
      }
    }
    if(counter > max){
      max = counter;
    }
    counter = 1;
  }
  console.log(max + ' pair');
}

function findHammingDistance(value){
  let count = 0;
  while(value !== 0){
    if(value & 1)
      return count;
    value >>= 1;
    count++;
  }
  console.log('error value');
  return -1;
}

function resetFlushBuckets(){
  for(let i = 0; i < flushBuckets.length; i++){
    flushBuckets[i] = 0;
  }
}

function checkIfFlush(numberToCheckFor){
  for(let i = 0; i < flushBuckets.length; i++){
    if(flushBuckets[i] === numberToCheckFor)
      return 1 << i;
  }
  return false;
}

function orArray(array, comparison = 0){
  let combined = 0;
  for(let i = 0; i < array.length; i++){
    if(array[i] > comparison)
      combined |= array[i];
  }
  return combined;
}

function dealtRoyalFlush(suitsHeld, valuesHeld){
  let royalFlushChecker = orArray(valuesHeld);
  resetFlushBuckets();
  for(let i = 0; i < suitsHeld.length; i++){
    flushBuckets[findHammingDistance(suitsHeld[i])]++;
  }
  if(!checkIfFlush(5))
    return null;
  if(royalFlushChecker !== 7936)
    return null;
  return checkIfFlush(5) ? [0,1,2,3,4] : null;
}

function dealtStraightFlush(suitsHeld, valuesHeld){
  if(!checkIfFlush(5))
    return null;
  let straightFlushChecker = orArray(valuesHeld);
  while(straightFlushChecker > 0){
    if(straightFlushChecker === 31)
      return [0,1,2,3,4];
    straightFlushChecker >>= 1;
  }
  return null;
}

function resetPairBuckets(){
  for(let i = 0 ; i < pairBuckets.length; i++){
    pairBuckets[i] = 0;
  }
}


function returnKeptCards(valuesHeld, value){
  let returnArray = [];
  console.log(valuesHeld);
  for(let i = 0; i < valuesHeld.length; i++){
    console.log(valuesHeld[i]);
    if(valuesHeld[i] & value)
      returnArray.push(i);
  }
  return returnArray;
}

function dealtFourOfAKind(suitsHeld, valuesHeld){
  let i;
  let cardValue;
  resetPairBuckets();
  for(i = 0; i < valuesHeld.length; i++){
    pairBuckets[findHammingDistance(valuesHeld[i])]++;
  }
  for(i = 0; i < pairBuckets.length; i++){
    if(pairBuckets[i] === 4){
      cardValue = i;
      break;
    }
  }
  if(i === pairBuckets.length)
    return;
  cardValue = 1 << cardValue;
  let cardsToKeepArray = [];
  for(i = 0 ; i < valuesHeld.length; i++){
    if(parseInt(valuesHeld[i]) === cardValue)
      cardsToKeepArray.push(i);
  }
  return cardsToKeepArray;
}

function fourToRoyal(suitsHeld, valuesHeld){
  //missing 10, jack, queen, king, ace in that order
  let missingCardChecker = [7680, 7424, 6912, 5888, 3840];
  let totalCardValue = 0;
  //position 1: card suit, position 2: counter, position 3: position
  let suitOne = [suitsHeld[0],1,0];
  let suitTwo = [0,0,0];
  for(let i = 1; i < suitsHeld.length; i++){
    if(suitOne[0] & suitsHeld[i])
      suitOne[1]++;
    else{
      if(suitTwo[0] ^ suitsHeld[i]){
        suitTwo[0] = suitsHeld[i];
        suitTwo[2] = i;
      }
      suitTwo[1]++;
    }
  }
  let missingPosition = -1;
  if(suitTwo[1] & 4 || suitOne[1] & 4){
    suitTwo[1] & 4  ? missingPosition = suitOne[2] : missingPosition = suitTwo[2];
  }
  if(suitOne[1] === 5){
    for(let i = 0; i < valuesHeld.length; i++){
      if(valuesHeld[i] < 256)
        missingPosition = i;
    }
  }
  if(missingPosition === -1)
    return null;
  totalCardValue = orArray(valuesHeld) ^ valuesHeld[missingPosition];
  let cardsToKeep = [];
  let flag = false;
  for(let i = 0; i < missingCardChecker.length; i++){
    if(!(totalCardValue ^ missingCardChecker[i]))
    {
      flag = true;
    }
    else{
      cardsToKeep.push(i);
    }
  }
  return (flag) ? cardsToKeep : null; 
}

function dealtFullHouse(){
  if(checkIfFlush(3) && checkIfFlush(2))
    return [0,1,2,3,4];
  return null;
}

function dealtFlush(){
  if(checkIfFlush(5))
    return [0,1,2,3,4];
  return null;
}

function dealtThreeOfKind(valuesHeld){
  let i;
  for(i = 0; i < pairBuckets.length; i++){
    if(pairBuckets[i] === 3){
      break;
    }
  }
  if(i === pairBuckets.length)
    return null;
  let mask = 1 << i;
  let returnArray = [];
  for(i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] & mask){
      returnArray.push(i);
    }
  }
  return returnArray;
}

function dealtAStraight(valuesHeld){
  let counter = 0;
  let flag = false;
  let total = orArray(valuesHeld);
  while(total > 0){
    while(total & 1){
      counter++;
      total >>=1;
      flag = true;
    }
    total >>= 1;
    if(flag && counter < 5){
      return null;
    }
  }
  return [0,1,2,3,4];
}

function checkStraight(valuesHeld, gap){
  //resets values of variables if there are gaps
  let resetCounter = 0;
  //normal i function to count loops
  let counter = 0;
  let i;
  //counts how long the straight. does not reset unless resetCounter > gap
  let straightCounter = 0;
  let returnArray = [];
  let mask;
  let straightChecker = orArray(valuesHeld);
  console.log(straightChecker);
  //if 0 breaks loop
  while(straightChecker > 0){
    //checks if the one bit is on
    if(straightChecker & 1){
      //gets the position of the value in the valuesHeld array as the order can be randomized
      for(i = 0; i < valuesHeld.length; i++){
        mask = 1 << counter;
        console.log(valuesHeld[i] + ' : ' + mask);
        if(valuesHeld[i] & mask){
          break;
        }
      }
      returnArray.push(i);
      straightCounter++;
      resetCounter = 0;
    }
    else{
      //if one bit is off increment reset counter
      resetCounter++;
    }
    if(straightCounter === valuesHeld.length){
      return returnArray;
    } 
    if(resetCounter === (gap + 1)){
      straightCounter = 0;
      returnArray = [];
    }
    counter++;
    straightChecker >>= 1;
  }
  return null;
}

function fourToStraightFlush(suitsHeld, valuesHeld){
  const suit = checkIfFlush(4);
  if(!suit)
    return null;
  let straight = checkStraight(valuesHeld, 1);
  if(!straight)
    return null;
  for(let i = 0; i < straight.length; i++){
    if(!(suitsHeld[straight[i]] & suit))
      return null;
  }
  return straight;
}

function twoPair(suitsHeld, valuesHeld){
  let pairsArray = [0,0];
  let j = 0;
  for(let i = 0; i < pairBuckets.length; i++){
    if(pairBuckets[i] === 2){
      pairsArray[j] = 1 << i;
      j++;
    }
  }
  if(!(j & 2))
    return null;
  let returnArray = [];
  for(let i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] & pairsArray[0] || valuesHeld[i] & pairsArray[1])
      returnArray.push(i);
  }
  return returnArray;
}

function highPair(valuesHeld){
  let position = -1;
  for(let i = 0; i < pairBuckets.length; i++){
    if(pairBuckets[i] & 2)
      position = i;
  }
  if(position === -1)
    return null;
  position = 1 << position;
  if(position < 512)
    return null;
  let returnArray = [];
  for(let i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] & position)
      returnArray.push(i);
  }
  return returnArray;
}

function threeToRoyalFlush(suitsHeld, valuesHeld){
  let i;
  for(i = 0; i < flushBuckets.length; i++){
    if(flushBuckets[i] === 3)
      break;
  }
  if(i === flushBuckets.length)
    return null;
  let suitType = 1 << i;
  let returnArray = [];
  for(i = 0; i < suitsHeld.length; i++){
    if(parseInt(suitsHeld[i]) & suitType){
      if(parseInt(valuesHeld[i]) > 256)
        returnArray.push(i);
      else
        return null;
    }
  }
  return returnArray;
}

function fourToAFlush(suitsHeld, valueHeld){
  let i;
  for(i = 0; i < flushBuckets.length; i++){
    //don't have to worry about anything above 4 since it's covered in previous cases
    if(flushBuckets[i] & 4)
      break;
  }
  if(i === flushBuckets.length)
    return null;
  let suitType = 1 << i;
  let returnArray = [];
  for(let i = 0; i < suitsHeld.length; i++){
    if(suitsHeld[i] & suitType)
      returnArray.push(i);
  } 
  return returnArray;
}

function UnsuitedTenJackQueenKing(valuesHeld){
  let combinedValue = orArray(valuesHeld);
  let returnArray = [];
  //any cases where it's not unsuited or there are doubles are handled above.
  if((combinedValue & 3840) === 3840){
    for(let i = 0; i < valuesHeld.length; i++){
      if(valuesHeld[i] > 128)
        returnArray.push(i);
    }
  }
  else
    return null;
  return returnArray;
}

function lowPair(valuesHeld){
  //Any case for triple or quad pairs are handled above
  let i;
  for(i = 0; i < pairBuckets.length; i++){
    if(pairBuckets[i] & 2)
      break;
  }
  if(i === pairBuckets.length)
    return null;
  let value = 1 << i;
  let returnArray = [];
  //Any high pairs are already handled above
  for(let i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] & value)
      returnArray.push(i);
  }
  return returnArray;
}

function fourToOutsideStraight(valuesHeld){
  let positions = checkStraight(valuesHeld, 1);
  if(!positions)
    return null;
  let combinedValues = 0;
  for(let i = 0; i < positions.length; i++){
    combinedValues |= valuesHeld[positions[i]];
    if((valuesHeld[positions[i]] & 1) || (valuesHeld[positions[i]] & 4096))
      return null;
  }
  let counter;
  //make sure there is no gap in the middle. Then it wouldn't be an outside straight
  while(combinedValues){
    counter = 0;
    while(combinedValues & 1){
      counter ++;
      combinedValues >>= 1;  
    }
    if(counter === 4)
      return positions;
    combinedValues >>= 1;  
  }
  return null;
}

function threeToTypeOneStraightFlush(suitsHeld, valuesHeld){
  let highCardCount = 0;
  let suitType = checkIfFlush(3);
  //if suit is null return null
  if(!suitType)
    return null;
  let straightArray = [];
  //pushing all the same suit into an array
  for(let i = 0; i < suitsHeld.length; i++){
    if(suitType & suitsHeld[i])
      straightArray.push(valuesHeld[i]);
  }
  for(let i = 0; i < straightArray.length; i++){
    //Jack or greater
    if(straightArray[i] > 256)
      highCardCount++;
  }
  let positions = checkStraight(straightArray, highCardCount);
  if(!positions)
    return null;
  let returnArray = [];
  let combinedNumber = orArray(straightArray);
  for(let i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] & combinedNumber)
      returnArray.push(i);
  }
  return returnArray;
}

function twoSuitedHighCards(suitsHeld, valuesHeld){
  let suitArray = [];
  for(let i = 0; i < valuesHeld.length; i++){
    if(valuesHeld[i] > 256){
      suitArray.push(i);
    }
  }
  for(let i = 0; i < suitArray.length - 1; i++){
    for(let j = i + 1; j < suitArray.length; j++){
      if(suitsHeld[suitArray[i]] & suitsHeld[suitArray[j]]){
        return[i, j];
      }
    }
  }
  return null;
}

function threeToStraightFlush(suitsHeld, valuesHeld){
  const suitType = checkIfFlush(3);
  if(!suitType)
    return null;
  let straightChecker = [];
  for(let i = 0; i < suitsHeld.length; i++){
    if(suitsHeld[i] & suitType)
      straightChecker.push(1 << i);
  }
  console.log(straightChecker);
  let returnArray = checkStraight(straightChecker, 2);
  return returnArray;
}

function twoUnsuitedHighCards(suitsHeld, valuesHeld){
  const combined = orArray(valuesHeld);
  if(combined < 1536){
    return null;
  }
  const highCardArray = returnKeptCards(valuesHeld, 7680);
  console.log('these are the returned cards: ' + highCardArray);
  if(highCardArray.length < 3)
    return highCardArray;
  let minOne = Number.MAX_SAFE_INTEGER;
  let minTwo = Number.MAX_SAFE_INTEGER;
  let returnArray = [-1, -1];
  //pick the lower of the two;
  for(let i = 0; i < highCardArray.length; i++){
    console.log(valuesHeld[highCardArray[i]] + ' < ' + minOne + ' = ' + valuesHeld[highCardArray[i]] < minOne )
    if(valuesHeld[highCardArray[i]] < minOne){
      minTwo = minOne;
      minOne = valuesHeld[highCardArray[i]];
      returnArray[1] = returnArray[0];
      returnArray[0] = highCardArray[i];
    }
    else if(valuesHeld[highCardArray[i]] < minTwo){
      minTwo = valuesHeld[highCardArray[i]];
      returnArray[1] = highCardArray[i];
    }
  }
  return returnArray;

}

function printWinningCombinationOdds(suitsHeld, valuesHeld){
  let cardsToKeep = null;
  cardsToKeep = dealtRoyalFlush(suitsHeld, valuesHeld); //step 1
  if(cardsToKeep){
    console.log('Dealt Royal Flush');
    return cardsToKeep;
  }
  cardsToKeep = dealtStraightFlush(suitsHeld, valuesHeld); //step 1
  if(cardsToKeep){
    console.log('Dealt straight flush');
    return cardsToKeep;
  }
  cardsToKeep = dealtFourOfAKind(suitsHeld, valuesHeld); //step 1
  if(cardsToKeep){
    console.log('Dealt Four of a Kind')
    return cardsToKeep;
  }
  cardsToKeep = fourToRoyal(suitsHeld, valuesHeld); //step 2
  if(cardsToKeep){
    console.log('Dealt four to a Royal');
    return cardsToKeep;
  }
  cardsToKeep = dealtFullHouse();//step 3
  if(cardsToKeep){
    console.log('Dealt Full House');
    return cardsToKeep;
  }
  cardsToKeep = dealtFlush();//step 3
  if(cardsToKeep){
    console.log('Dealt a Flush');
    return cardsToKeep;
  }
  cardsToKeep = dealtThreeOfKind(valuesHeld);//step 3
  if(cardsToKeep){
    console.log('Dealt Three of a Kind');
    return cardsToKeep;
  }
  cardsToKeep = dealtAStraight(valuesHeld);//step 3
  if(cardsToKeep){
    console.log('Dealt a Straight');
    return cardsToKeep;
  }
  cardsToKeep = fourToStraightFlush(suitsHeld, valuesHeld);//step 4
  if(cardsToKeep){
    console.log('Dealt 4 to a straight flush');
    return cardsToKeep;
  }
  cardsToKeep = twoPair(suitsHeld, valuesHeld);//step 5
  if(cardsToKeep){
    console.log('Dealt Two Pair');
    return cardsToKeep;
  }
  cardsToKeep = highPair(valuesHeld);//step 6
  if(cardsToKeep){
    console.log('Dealt High Pair');
    return cardsToKeep;
  }
  cardsToKeep = threeToRoyalFlush(suitsHeld, valuesHeld);//step 7
  if(cardsToKeep){
    console.log('Dealt Three to Royal Flush');
    return cardsToKeep;
  }
  cardsToKeep = fourToAFlush(suitsHeld, valuesHeld);//step 8
  if(cardsToKeep){
    console.log('Dealt Four to a Flush');
    return cardsToKeep;
  }
  cardsToKeep = lowPair(valuesHeld);//step 9
  if(cardsToKeep){
    console.log('Dealt a low Pair');
    return cardsToKeep;
  }
  cardsToKeep = fourToOutsideStraight(valuesHeld);//step 10
  if(cardsToKeep){
    console.log('Dealt 4 cards to an outside straight');
    return cardsToKeep;
  }
  cardsToKeep = twoSuitedHighCards(suitsHeld, valuesHeld);//step 11 modify
  if(cardsToKeep){
    console.log('Dealt two suited high cards');
    return cardsToKeep;
  }
  cardsToKeep = threeToStraightFlush(suitsHeld, valuesHeld);//step 11 modify
  if(cardsToKeep){
    console.log('Dealt three to a straight flush');
    return cardsToKeep;
  }
  cardsToKeep = twoUnsuitedHighCards(suitsHeld, valuesHeld);//step 11 modify
  if(cardsToKeep){
    console.log('Dealt two unsuited high cards');
    return cardsToKeep;
  }
  return null;
}

function calculateChances(suitsHeld, valuesHeld){
  currentCardsHeld(suitsHeld, valuesHeld);
  removeDrawnCardsFromDeck(suitsHeld, valuesHeld);
  printLeftoverCardsInDeck();
  console.log(printWinningCombinationOdds(suitsHeld, valuesHeld));

}
export {printWinningCombinationOdds};