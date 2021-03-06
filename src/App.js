import React from 'react';
import Training from './component/training';
import Game from './component/game';
// import ReactDOM from 'react-dom';
import {Splash} from './component/splash';
// import DevState from './component/devState';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

function App(){
    return(
      <BrowserRouter>
        <div className="App main" key="app-main">
          {/* <DevState /> */}
          <Switch>
            <Redirect exact from='/' to='/splash' />
            <Route exact path='/splash' component={Splash} />
            <Route exact path='/training' component={Training} />
            <Route exact path='/game' component={Game} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
}

export default App;
