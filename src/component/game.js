import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import './training.css';
import { fetchHoldCard, fetchIdealCards, fetchHand } from '../actions/game';

// import Deck from "react-poker";

class Game extends Component {
  

  componentDidMount() {
    this.render();
  }
  render() {
    const board = this.renderTheBoard(this.props.cards);
    return (
      <div className="deal">
        {board}
      </div>
    );

  }

  renderTheBoard(stuff) {
    return (
      <div className="game-component" >
        <ul className="hand"
          onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}
        >
          {this.deckRender(stuff)}
        </ul>

        <button onClick={() => this.grade(this.props.cards)}>Confirm</button>
      </div>
    )
  }

  deckRender(stuff) {
    return stuff.map((card, i) => {
      return (
        <li
          key={i}
          value={i}
          className="cardDrop"
        >
          random stuff
        </li>
      )
    }
    )
  }
  cardElement(thing, num) {
    return thing;
  }
}

const mapStateToProps = (state) => {
  return ({
    game: state.game,
    cards: state.game.cards,
    note: state.game.note
  });
}

export default connect(mapStateToProps)(Game);

