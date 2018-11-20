import { FETCH_GAME_REQUEST, FETCH_GAME_SUCCESS, FETCH_GAME_ERROR, FETCH_HAND } from '../actions/game';
import { AUTH_SUCCESS } from '../actions/auth';

const initialState = {
  loggedIn: false,
  loading: false,
  cards: [],
  score: 0,
  error: null
}

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS: {
      return {
        state,
        loggedIn: true,
        error: null
      }
    }

    case FETCH_GAME_REQUEST: {
      console.log('fetch game request');
      return {
        state,
        loading: true,
        error: null
      }
    }
    case FETCH_GAME_SUCCESS: {
      return{
        ...state,
        cards: action.cards,
        loggedIn: true,
        loading: false
      }
    }
    case FETCH_GAME_ERROR: {
      return{
        ...state,
        loading: false,
        error: action.error
      }
    }

    case FETCH_HAND: {
      return{
        ...state,
        loading: false,
        cards: {
          ...action.cards
        }
      }
    }

    default: {
      return state;
    }
  }
}