import {API_BASE_URL} from '../config';

export const FETCH_GAME_REQUEST = 'FETCH_GAME_REQUEST';
export const fetchGameRequest = (game) => ({
  type: FETCH_GAME_REQUEST,
})

export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SECCESS';
export const fetchGameSuccess = (game) => ({
  type: FETCH_GAME_REQUEST,
  game
})

export const FETCH_HAND = 'FETCH_HAND';
export const fetchHand = (hand) => ({
  type: FETCH_HAND,
  hand
})

export const FETCH_GAME_ERROR = 'FETCH_GAME_ERROR';
export const fetchGameError = error => ({
  type: FETCH_GAME_ERROR,
  error
})

export const IDEAL_CARD = 'IDEAL_CARD';
export const fetchIdealCards = (hand) => ({
  type: IDEAL_CARD,
  hand
})

export const HOLD_CARD = 'HOLD_CARD';
export const fetchHoldCard = (hand) => ({
  type: HOLD_CARD,
  hand
})

export const FETCH_GAME_DATA = 'FETCH_GAME_DATA';
export const fetchGameData = (game) => ({
  type: FETCH_GAME_DATA,
  game
})

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  note
})

export const RESET_GAME = 'RESET_GAME';
export const resetGame = () => ({
  type: RESET_GAME,
})

export const UPDATE_GAME = 'UPDATE_GAME';
export const updateGame = (handsPlayed, score) => ({
  type: UPDATE_GAME,
  handsPlayed,
  score
});


export const fetchGame = () => {
  dispatchEvent(fetchGameRequest());
  return fetch(`${API_BASE_URL}/api/game`)
  .then(res => res.json())
  .then(game => dispatchEvent(fetchGameSuccess(game)))
  .then(hand => dispatchEvent(fetchHoldCard(hand)))
  .then(hand => dispatchEvent(fetchIdealCards(hand)))
  .then(hand => dispatchEvent(fetchHand(hand)))
  .then((handsPlayed, score) => dispatchEvent(updateGame(handsPlayed, score)))
  .then(game => dispatchEvent(updateNote(game)))
  .then(game => dispatchEvent(fetchGameData(game)))
  .catch(err => dispatchEvent(fetchGameError(err)))
}