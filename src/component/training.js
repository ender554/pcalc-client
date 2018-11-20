import React from 'react';
import { Link } from "react-router-dom";

import './training.css';

// import Deck from "react-poker";
const { decks } = require('cards');


const deck = new decks.StandardDeck({ jokers: 0 });

function change(card){
  console.log(card.rank.shortName + card.suit.name);
}

function suitLog(suit, rank){
  console.log(rank);
  console.log(suit);
}

function deckRender(hand) {
  

  return hand.map((card, i) => {
    const name = card;
    const rank = card;
    return <li 
    key={i}
    onClick={() => suitLog(name.suit.name, rank.rank.shortName)}
    >{card.rank.shortName} {card.suit.name}
    </li>
  }
  )
};

export function Training() {
  deck.shuffleAll();
  const hand = deck.draw(5);
  // console.log(hand);
  return (
    <div className="deal"><Link to='/training'><button>Deal</button></Link>
      <div className="game-component" >
        <ul className="hand">
          {(deckRender(hand))}
        </ul>
        <button>Confirm</button>
      </div>
    </div>
  );
}