import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';

import './training.css';
import { fetchHoldCard, fetchIdealCards, fetchHand } from '../actions/game';

// import Deck from "react-poker";
const { decks } = require('cards');
let score = 0;
let handsPlayed = 0;
let correctGuess = 0;

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
        <p>Hands Played: {handsPlayed}</p>
        <p>Score: {score}</p>
        {board}
      </div>
    );

  }

  grade(cards) {
    this.props.dispatch(fetchIdealCards(gradeTheHand(cards)));
    handsPlayed++;
    this.calculateScore(cards);
  }
  calculateScore(hand) {
    let counter = 0;
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].held === hand[i].ideal) {
        counter++;
      }
    }
    if (counter === 5) {
      correctGuess++;
    }
    score = correctGuess / handsPlayed;
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