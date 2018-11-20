import React from 'react';
import { Training } from './component/training';
// import ReactDOM from 'react-dom';
import { NavBar } from './component/navbar';
import {Splash} from './component/splash';
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
          <Switch>
            <Redirect exact from='/' to='/splash' />
            <Route exact path='/splash' component={Splash} />
            <Route exact path='/training' component={Training} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/history' component={HistoryPage} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
}

export default App;
