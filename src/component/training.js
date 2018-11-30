//import statements (React Component connect grader saveUserData training.css notes.css 
//fetchHoldCard, fetchIdealCards, fetchHand, updateGame, updateNote, resetGame)
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import { saveUserData } from '../actions/auth';

import './training.css';
import './notes.css';

import { fetchHoldCard, fetchIdealCards, fetchHand, updateGame, updateNote, resetGame } from '../actions/game';

// build deck object from cards dependency
const { decks } = require('cards');

//set feedback variables
let score = 0;
let handsPlayed = 0;
let correctGuess = 0;

class Training extends Component {

  //local props
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  //on mount dealHand
  componentDidMount() {
    this.dealHand();
  }

  //deal the hand makes new deck shuffles it and draws 5 cards then dispatches to the state
  dealHand() {
    const deck = new decks.StandardDeck({ jokers: 0 });
    deck.shuffleAll();
    const hand = deck.draw(5);
    this.props.dispatch(fetchHand(hand));
  }

  //main render function
  //calls renderTheBoard grade, saveGame, dealHand, showNotes, renderNotes
  render() {
    const board = this.renderTheBoard(this.props.cards);
    const confirmButton = (<button onClick={() => this.grade(this.props.cards)}>Confirm</button>);
    const saveButton = (<button onClick={() => this.saveGame(this.props.game)}>Save</button>);
    const dealButton = (<button onClick={() => this.dealHand()}>Deal</button>);
    const notesButton = (<button onClick={() => this.showNotes()}>Notes</button>);
    const deal = (<div className="deal">
      {this.state.showModal && this.renderNotes()}
      <h1>Hands Played: {handsPlayed}</h1>
      <h2>Score: {score}</h2>
      {board}
    </div>)
    const buttons = (<div className="controls">{dealButton}    {confirmButton}    {saveButton}  {notesButton}</div>);
    return (
      <main className="training">
        {deal}   {buttons}
      </main>

    );

  }

  //renders the baord
  //calls handRender
  renderTheBoard(hand) {
    return (
      <div className="game-component" >
        <ul
        >
          {this.handRender(hand)}
        </ul>
      </div>
    )
  }


  //dispatches the current hand to the grader calls fetchIdealCards and grader, calculateScore and updateGame
  grade(cards) {
    this.props.dispatch(fetchIdealCards(grader(cards)));
    handsPlayed++;
    this.calculateScore(cards);
    this.props.dispatch(updateGame(handsPlayed, score));
  }

  //save game saves the current game state to the user history and resets the game
  //calls save UserData then resetsGame, then dealHand
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

  //shows the notes modal via local state
  showNotes() {
    this.setState({ showModal: true })
  }

  //renders the note controls and field
  //calls updateTheNote and setState
  renderNotes() {
    return (
      <div className="noteModal">
        <input
          type="text"
          onChange={e => this.updateTheNote(e.currentTarget.value)}
          defaultValue={this.props.note}
        ></input>
        <button onClick={e => this.setState({ showModal: false })}>Close</button>

      </div>
    )
  }

  //renders the hand itself
  //calls heldCard and openCard
  handRender(hand) {
    return hand.map((card, i) => {
      return (card.held ? this.heldCard(card, i) : this.openCard(card, i))
    }
    )
  };

  //calculates the score of current training session
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

  //updates the note state
  updateTheNote(value) {
    this.props.dispatch(updateNote(value))
  }

  //renders each card that has been set to held
  //dispatches fetchHoldCard
  heldCard(card, i) {
    const imageName = card.rank + (card.suit.charAt(0).toUpperCase());
    const image = (`/images/JPEG/${imageName}.jpg`)
    const cardPic = <img src={image} alt={imageName} onClick={(target) => this.props.dispatch(fetchHoldCard(i))} />;
    if (card.ideal) {
      return <li
        key={i}
        value={i}
        className="ideal"
      >
        {cardPic}
      </li>
    } else {
      return <li
        key={i}
        value={i}
        className="held"
      >
        {cardPic}
      </li>
    }
  }

  //renders each card that has not been set to held
  //dispatches fetchHoldCard
  openCard(card, i) {
    const imageName = card.rank + (card.suit.charAt(0).toUpperCase());
    const image = (`/images/JPEG/${imageName}.jpg`)
    const cardPic = <img src={image} alt={imageName} onClick={(target) => this.props.dispatch(fetchHoldCard(i))} />;
    if (card.ideal) {
      return <li
        key={i}
        value={i}
        className="ideal"
      >
        {cardPic}
      </li>
    } else {
      return <li
        key={i}
        value={i}
        className="notHeld"
      >
        {cardPic}
      </li>
    }
  }
}

//maps the game cards and notes to state
const mapStateToProps = (state) => {
  return ({
    game: state.game,
    cards: state.game.cards,
    note: state.game.note
  });
}

export default connect(mapStateToProps)(Training);