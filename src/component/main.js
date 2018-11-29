import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './main.css';
const Main = props => {
  const atopH1 = (<h1 className="menu-title">Menu</h1>);

  const atopA = (<a href="#main-menu" className="menu-toggle" role="button" id="main-menu-toggle" aria-expanded="false" aria-controls="main-menu"
    aria-label="Open main menu">
    <span className="sr-only">Open main menu</span>
    <span className="fa fa-bars">{atopH1}</span>
  </a>);

  const nav = (<nav id="main-menu" className="main-menu" aria-expanded="false" aria-label="Main menu">

    <a href="#main-menu-toggle" className="menu-close" aria-expanded="false"
      aria-controls="main-menu"
      aria-label="Close main menu">
      <span className="sr-only">Close main menu</span>
      <span className="fa fa-close"></span>
    </a>
    <ul>
      <li><Link to='/game' role="button"><button>New Game</button></Link></li>
      <li><Link to='/userHistory' role="button"><button>View History</button></Link></li>
      <li><Link to='/training' role="button"><button>New Training</button></Link></li>
      <li><Link to='/logout' role="button"><button>Log Out</button></Link></li>
    </ul>
  </nav>);
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  const bottomA = (<a href="#main-menu-toggle" className="backdrop" tabIndex="-1"
    hidden></a>);
  if (props.loggedIn) {
    return ([
      atopA,
      nav,
      bottomA
    ])
  }
  else return (
    <div className="button-navs"></div>
  )
}

const mapStateToProps = state => {
  return ({ loggedIn: state.auth.authToken != null });
}
export default connect(mapStateToProps)(Main);