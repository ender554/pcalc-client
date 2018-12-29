import {
  FETCH_GAME_REQUEST, FETCH_GAME_SUCCESS, FETCH_GAME_ERROR, FETCH_HAND, HOLD_CARD,
  UPDATE_GAME, IDEAL_CARD, FETCH_GAME_DATA, RESET_GAME
} from '../actions/game';

const initialState = {
  loading: false,
  cards: [
    {
      rank: "a",
      suit: "s",
      held: false,
      ideal: false
    },
    {
      rank: "a",
      suit: "s",
      held: false,
      ideal: false
    },
    {
      rank: "a",
      suit: "s",
      held: false,
      ideal: false
    },
    {
      rank: "a",
      suit: "s",
      held: false,
      ideal: false
    },
    {
      rank: "a",
      suit: "s",
      held: false,
      ideal: false
    }
  ],
  hand: false,
  error: null,
  handsPlayed: 0,
  score: 0,
  type: "jacksOrBetter"
}

export default function Reducer(state = initialState, action) {

  switch (action.type) {

    case RESET_GAME: {
      return {
        initialState
      }
    }

    case FETCH_HAND: {
      const newHand = [];
      for (let i = 0; i < action.hand.length; i++) {
        const card = {
          suit: action.hand[i].suit.name,
          rank: action.hand[i].rank.shortName,
          held: false,
          ideal: false
        }
        newHand.push(card);
      }

      return {
        ...state,
        loading: false,
        cards: newHand,
        handsPlayed: +1
      }
    }

    case HOLD_CARD: {
      const heldHand = [];
      for (let i = 0; i < state.cards.length; i++) {
        if (i === action.hand) {
          const card = {
            suit: state.cards[i].suit,
            rank: state.cards[i].rank,
            held: !state.cards[i].held,
            ideal: false
          }
          heldHand.push(card);
        }
        else {
          const card = {
            suit: state.cards[i].suit,
            rank: state.cards[i].rank,
            held: state.cards[i].held,
            ideal: false
          }
          heldHand.push(card);
        }
      }
      return {
        ...state,
        loading: false,
        cards: heldHand
      }
    }

    case IDEAL_CARD: {
      const idealCards = [];
      for (let i = 0; i < state.cards.length; i++) {
        const card = {
          suit: state.cards[i].suit,
          rank: state.cards[i].rank,
          held: state.cards[i].held,
          ideal: action.hand[i].ideal
        }
        idealCards.push(card);
      }

      return {
        ...state,
        loading: false,
        cards: idealCards
      }
    }

    case UPDATE_GAME: {
      return{
        ...state,
        score: action.score,
        handsPlayed: action.handsPlayed

      }
    }

    case FETCH_GAME_REQUEST: {
      return {
        state,
        loading: true,
        error: null,
        note: ''
      }
    }
    case FETCH_GAME_SUCCESS: {
      return {
        ...state,
        cards: action.cards,
        loading: false
      }
    }
    case FETCH_GAME_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }

    case FETCH_GAME_DATA: {
      return {
        ...state
      }
    }



    default: {
      return state;
    }
  }
}