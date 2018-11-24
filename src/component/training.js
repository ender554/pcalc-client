import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';

import './training.css';
import { fetchHoldCard, fetchIdealCards, fetchHand } from '../actions/game';

// import Deck from "react-poker";
const { decks } = require('cards');

const gradeTheHand = function (hand) {
  return grader(hand);
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
    let holdCards = gradeTheHand(cards);
    var keys = Object.keys(holdCards);
    let keepers = [];
    keys.forEach( function(key) {
      let values = holdCards[key]
      if(key === "cards"){
        values.forEach( function(value) {
          let individual = `${value.value}${value.suit}`;
          keepers.push(individual);
        })
      }
    });
    this.setIdeal(keepers);
  }

  setIdeal(keepers){
    for(let i = 0; i < keepers.length ; i++){
      console.log(keepers);
    }
  }

  renderTheBoard(hand) {
    return (
      <div className="game-component" >
        <ul className="hand"
          onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}
        >
          {this.deckRender(hand)}
        </ul>
        <button onClick={() => this.grade(this.props.cards)}>Confirm</button>
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
    if (card.ideal) {
      return <li
        key={i}
        value={i}
        className="ideal"
      >
        {card.rank} {card.suit}
      </li>
    } else {
      return <li
        key={i}
        value={i}
        className="held"
      >
        {card.rank} {card.suit}
      </li>
    }
  }

  openCard(card, i) {
    if (card.ideal) {
      return <li
        key={i}
        value={i}
        className="ideal"
      >
        {card.rank} {card.suit}
      </li>
    } else {
      return <li
        key={i}
        value={i}
        className="notHeld"
      >
        {card.rank} {card.suit}
      </li>
    }
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