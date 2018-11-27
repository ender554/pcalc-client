import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import './training.css';
import { fetchHoldCard, fetchIdealCards, fetchHand } from '../actions/game';
// import Deck from "react-poker";
// onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}

let hand = [];

let card = {
  rank: '',
  suit: '',
  position: ''
};
class Game extends Component {

  state = {
    showModal: false,
    hand: [{}, {}, {}, {}, {}],
    currentCard: null
  }

  componentDidMount() {
    this.render();
  }
  render() {
    const board = this.renderTheBoard(this.state.hand);
    const modal = (<form
      onSubmit={(e) => { this.setCard(e) }}>modal
      <select ref={input=> this.suit = input}>
        <option value='hearts'>hearts</option>
        <option value='spades'>spades</option>
        <option value='clubs'>clubs</option>
        <option value='diamonds'>diamonds</option>
      </select>
      <select ref={input=> this.rank = input}>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='T'>T</option>
        <option value='J'>J</option>
        <option value='Q'>Q</option>
        <option value='K'>K</option>
        <option value='A'>A</option>
      </select>
      <button
        type="submit"
      >Submit</button>
    </form>)
    return (
      <div className="deal">
        {board}
        {this.state.showModal ? modal : ''}
      </div>
    );

  }

  setCard(e) {
    this.setState({ 
      showModal: false,
      hand: this.state.hand.map((card, i) => {
        if(this.state.currentCard === i){
          return {
            suit: this.suit.value,
            rank: this.rank.value
          }
        }
        return card;
      })
    })
    // console.log(this.suit.value);

    console.log(this.rank.value);
  }

  renderTheBoard(stuff) {
    return (
      <div className="game-component" >
        <ul className="hand">
          {this.deckRender(stuff)}
        </ul>

        <button onClick={() => this.grade(this.props.cards)}>Confirm</button>
      </div>
    )
  }

  cardSelector(e) {
    this.setState({
      showModal: true,
      currentCard: e.value
    })
  }
  cardRender(card) {
    console.log(card);
  }

  deckRender(hand) {
    return hand.map((card, i) => {
      return (
        <li
          key={i}
          value={i}
          className="cardDrop"
          onClick={e => this.cardSelector(e.target)}
        >
          {card.rank? card.rank: ""} {card.suit? card.suit: ""} 
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

