import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducers/game';



const rootReducer = combineReducers({
  game: Reducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  )

export default store;