import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {grader} from '../grader';

import './training.css';
import { fetchHand } from '../actions/game';
import { fetchHoldCard } from '../actions/game';

// import Deck from "react-poker";
const { decks } = require('cards');

const gradeTheHand = function(hand){
   const bestHand = grader(hand);
   console.log(bestHand);
}



class Training extends Component {

  componentDidMount() {
    this.dealHand();
  }
  render() {
    const board = this.renderTheBoard(this.props.cards);
    return (
      <div className="deal"><button onClick={() => this.dealHand()}>Deal</button>
        {board}
      </div>
    );

  }

  grade(cards){
    gradeTheHand(cards);
  }

  renderTheBoard(hand) {
    return (
      <div className="game-component" >
        <ul className="hand"
          onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}
        >          
          {this.deckRender(hand)}
        </ul>
        <button onClick={()=> this.grade(this.props.cards)}>Confirm</button>
      </div>
    )
  }
  deckRender(hand) {
    return hand.map((card, i) => {
      return (card.held ? this.heldCard(card, i) : this.openCard(card, i))
    }
    )
  };

  heldCard(card, i) {
    return <li
      key={i}
      value={i}
      className="held"
    >
      {card.rank} {card.suit}
    </li>
  }

  openCard(card, i){
    return <li
      key={i}
      value={i}
    >
      {card.rank} {card.suit}
    </li>
  }



  dealHand() {
    const deck = new decks.StandardDeck({ jokers: 0 });
    deck.shuffleAll();
    const hand = deck.draw(5);
    this.props.dispatch(fetchHand(hand));
  }

  
  

  

  

  

}

const mapStateToProps = (state) => {
  return ({
    cards: state.game.cards
  });
}

export default connect(mapStateToProps)(Training);