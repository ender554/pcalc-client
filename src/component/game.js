import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { grader } from '../grader';
import './training.css';
import cardback from '../cardback.jpg';
// import Deck from "react-poker";
// onClick={(target) => this.props.dispatch(fetchHoldCard(target.target.value))}




class Game extends Component {

  state = {
    showModal: false,
    hand: [{}, {}, {}, {}, {}],
    currentCard: null,
    graded: false
  }

  componentDidMount() {
    this.render();
  }
  render() {
    const resetButton = (<button onClick={() => this.restart()}>Reset</button>);
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
    return (
      <div className="deal training">
        {resetButton}
        {board}

        {this.state.showModal ? modal : ''}
      </div>
    );

  }

  setImage(string){
    return {string};
  }

  restart() {
    this.setState({
      showModal: false,
      hand: [{}, {}, {}, {}, {}],
      currentCard: null,
      graded: false
    })
  }

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
        >Submit</button>
      )
    }
    else return (<div></div>)
  }



  gradeTheHand(hand) {
    grader(hand);
    this.setState({ graded: true });
  }

  renderTheBoard(stuff) {
    const confirmButton = this.renderConfirm();
    return (
      <div className="game-component" >
        <ul className="hand">
          {this.deckRender(stuff)}
        </ul>
        {confirmButton}
      </div>
    )
  }

  cardSelector(e) {
    this.setState({
      showModal: true,
      currentCard: e.value
    })
  }

  deckRender(hand) {
    return hand.map((card, i) => {
      if (card.ideal) {
        return (
          <li
            key={i}
            value={i}
            className="ideal"
            onClick={e => this.cardSelector(e.currentTarget)}
          >
            {card.rank ? <img src={card.image} alt={card.image}/> : <img src={cardback} alt="cardback" />  }
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
            {card.rank ? <img src={card.image} alt={card.image}/> : <img src={cardback} alt="cardback" />  }
          </li>
        )
      }
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
