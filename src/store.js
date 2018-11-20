import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import Reducer from './reducers/game';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';



const rootReducer = combineReducers({
  form: formReducer,
  game: Reducer,
  auth: authReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
  )

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;