import React from "react";
import { clearAuth } from '../actions/auth';
import { connect } from 'react-redux';
import { saveUserData } from '../actions/auth';
import  './training.css';





class Logout extends React.Component {

  constructor (props){
    super(props);
    this.logOut = this.logOut.bind(this)
  }

  logOut(){
    this.props.dispatch(saveUserData(this.props.game))
    .then(this.props.history.push('/'))
    this.props.dispatch(clearAuth())
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return(
      <main className="logoutButton"><h1>Big 'ol LogOut Button</h1>
        <button onClick={this.logOut}>LogOut</button>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    game: state.game,
    cards: state.game.cards,
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Logout);