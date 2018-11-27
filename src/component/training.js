import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import { saveUserData } from '../actions/auth';

import './training.css';
import './notes.css';

import { fetchHoldCard, fetchIdealCards, fetchHand, updateGame, updateNote, resetGame } from '../actions/game';

// import Deck from "react-poker";
const { decks } = require('cards');
let score = 0;
let handsPlayed = 0;
let correctGuess = 0;

const gradeTheHand = function (hand) {

  return grader(hand);
}



class Training extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentDidMount() {
    this.dealHand();
  }
  render() {
    const board = this.renderTheBoard(this.props.cards);

    return (
      <div className="deal"><button onClick={() => this.dealHand()}>Deal</button>
        <button onClick={() => this.showNotes()}>Notes</button>
        {this.state.showModal && this.renderNotes()}
        <p>Hands Played: {handsPlayed}</p>
        <p>Score: {score}</p>
        {board}
      </div>
    );

  }

  renderNotes() {
    return (
      <div className="noteModal">
        <input 
          type="text"
          onChange={e => this.updateTheNote(e.currentTarget.value)}
          defaultValue={this.props.note}
        ></input>
        <button onClick={e => this.setState({showModal: false})}>Close</button>

      </div>
    )
  }

  grade(cards) {
    this.props.dispatch(fetchIdealCards(gradeTheHand(cards)));
    handsPlayed++;
    this.calculateScore(cards);
    this.props.dispatch(updateGame(handsPlayed, score));
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
          {/* {this.showNotes()} */}
        </ul>

        <button onClick={() => this.grade(this.props.cards)}>Confirm</button>
        <button onClick={() => this.saveGame(this.props.game)}>Save</button>
      </div>
    )
  }

  showNotes() {
    this.setState({ showModal: true })
  }

  updateTheNote(value) {
    console.log('changing Notes');
    this.props.dispatch(updateNote(value))
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


  saveGame() {
    this.props.dispatch(saveUserData(this.props.game))
    .then(this.props.dispatch(resetGame()))
    .then(this.dealHand())
    .then(
      score = 0,
      handsPlayed = 0,
      correctGuess = 0
    )
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
    game: state.game,
    cards: state.game.cards,
    note: state.game.note
  });
}

export default connect(mapStateToProps)(Training);