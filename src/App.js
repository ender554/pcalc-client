import React from 'react';
import Training from './component/training';
import Game from './component/game';
import Logout from './component/logout'
// import ReactDOM from 'react-dom';
import { NavBar } from './component/navbar';
import {Splash} from './component/splash';
// import DevState from './component/devState';
import Main from './component/main';
import LoginForm from './component/login';
import {HistoryPage} from './component/history';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

function App(){
    return(
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Main />
          {/* <DevState /> */}
          <Switch>
            <Redirect exact from='/' to='/splash' />
            <Route exact path='/splash' component={Splash} />
            <Route exact path='/training' component={Training} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/history' component={HistoryPage} />
            <Route exact path='/game' component={Game} />
            <Route exact path='/logout' component={Logout} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
}

export default App;
