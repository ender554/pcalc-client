//import statements {React, Component, connect, grader, cardback(jpg)}
import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import './training.css';
import cardback from '../cardback.jpg';
import Main from './main';

class Game extends Component {

  //default local state of game for live game, does not require dynamic state just local
  //exports with state mapped to props for possible future needs involving grade type
  state = {
    showModal: false,
    hand: [{}, {}, {}, {}, {}],
    currentCard: null,
    graded: false
  }

  //on mount render
  componentDidMount() {
    this.render();
  }


  //main render function 
  //calls restart, renderTheBoard, setCard
  render() {
    const resetButton = (<button onClick={() => this.restart()} aria-label="reset">Reset</button>);
    const board = this.renderTheBoard(this.state.hand);
    const modal = (<form
      onSubmit={(e) => { this.setCard(e) }}>modal
      <select ref={input => this.suit = input}>
        <option value='hearts'>hearts</option>
        <option value='spades'>spades</option>
        <option value='clubs'>clubs</option>
        <option value='diamonds'>diamonds</option>
      </select>
      <select ref={input => this.rank = input}>
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
    const main = (<Main />);
    const game = (<main className="deal training">
    {resetButton}
    <h1>Live Game Play!</h1>
    {board}
    {this.state.showModal ? modal : ''}
  </main>);
    return (
     <div> {main} {game}</div>
      
    );
  }

//sets state back to default
restart() {
  this.setState({
    showModal: false,
    hand: [{}, {}, {}, {}, {}],
    currentCard: null,
    graded: false
  })
}

//renders the board portion of the playing field
//calls renderConfirm and handRender
renderTheBoard(stuff) {
  const confirmButton = this.renderConfirm();
  return (
    <div className="game-component" >
      <ul className="hand">
        {this.handRender(stuff)}
      </ul>
      {confirmButton}
    </div>
  )
}

//sets the cards maping the hand and getting the rank, suit and image of the card in question
setCard(e) {
  let imageName;
  this.setState({
    showModal: false,
    hand: this.state.hand.map((card, i) => {
      if (this.state.currentCard === i) {
        imageName = this.rank.value + (this.suit.value.charAt(0).toUpperCase());
        return {
          suit: this.suit.value,
          rank: this.rank.value,
          image: `/images/JPEG/${imageName}.jpg`
        }
      }
      return card;
    })
  })
}

//renders the board and correct state on confirming of hand input
//calls Grade The Hand
renderConfirm() {
  let handCount = 0;
  for (let i = 0; i < this.state.hand.length; i++) {
    if (this.state.hand[i].suit) {
      handCount++;
    }
  }
  if (handCount === 5) {
    return (
      <button
        onClick={() => this.gradeTheHand(this.state.hand)}
      >Hold?</button>
    )
  }
  else return (<div></div>)
}

//renders the cards on the board and associates their keys
//shows card images via cardSelector
handRender(hand) {
  return hand.map((card, i) => {
    if (card.ideal) {
      return (
        <li
          key={i}
          value={i}
          className="ideal"
          onClick={e => this.cardSelector(e.currentTarget)}
        >
          {card.rank ? <img src={card.image} alt={card.image} /> : <img src={cardback} alt="cardback" />}
        </li>
      )
    }
    else {
      return (
        <li
          key={i}
          value={i}
          className="cardDrop"
          onClick={e => this.cardSelector(e.currentTarget)}
        >
          {card.rank ? <img src={card.image} alt={card.image} /> : <img src={cardback} alt="cardback" />}
        </li>
      )
    }
  }
  )
}


//sends the current hand out to the grading logic and sets the state of the graded property to true
gradeTheHand(hand) {
  grader(hand, this.props.game.type);
  this.setState({ graded: true });
}

//allows targeted card to be manipulated
cardSelector(e) {
  this.setState({
    showModal: true,
    currentCard: e.value
  })
}
}

//future for mapping game types to props
const mapStateToProps = (state) => {
  return ({
    game: state.game,
    cards: state.game.cards,
  });
}

//export component
export default connect(mapStateToProps)(Game);
