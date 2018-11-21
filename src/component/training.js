import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import './training.css';
import { fetchHand } from '../actions/game';
import { fetchHoldCard } from '../actions/game';

// import Deck from "react-poker";
const { decks } = require('cards');





class Training extends Component {


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

  deckRender(hand) {
    return hand.map((card, i) => {
      // return <li
      //   key={i}
      //   value={i}
      // >{card.rank} {card.suit} 
      // </li>
      return (card.held ? this.heldCard(card, i) : this.openCard(card, i))
    }
    )
  };

  renderTheBoard(hand) {
    return (
      <div className="game-component" >
        <ul className="hand"
          onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}
        >
          {(this.deckRender(hand))}
        </ul>
        <button>Confirm</button>
      </div>
    )
  }

  dealHand() {
    const deck = new decks.StandardDeck({ jokers: 0 });
    deck.shuffleAll();
    const hand = deck.draw(5);
    this.props.dispatch(fetchHand(hand));
  }

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

}

const mapStateToProps = (state) => {
  return ({
    cards: state.game.cards
  });
}

export default connect(mapStateToProps)(Training);