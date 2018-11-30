//import statements (React, connect, hostory.css and training.css)
import React from 'react'
import { connect } from 'react-redux';
import './history.css';
import './training.css';


//history component for user
class HistoryPage extends React.Component {

  //props constructor
  constructor(props) {
    super(props);
    this.state = { props };
  }

  //main render function renders the history page
  //calls on showHistory
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
    if (!this.props.auth.currentUser) {
      return (
        <div>Please Log In!</div>
      )
    }
    let viewHistory = this.showHistory(this.props.auth.currentUser.sessions);
    return (
      <main className="history">
      <h1>History</h1>
        {viewHistory}
      </main>
    )
  }

  //returns the map of the users history as a li inside a ul
  //calls dataRender
  showHistory(history) {

    return (
      history.map((dataBit, i) => {
        return (
          <ul 
          key={i+"list"}      
          className="history"
          >
            {this.dataRender(dataBit, i)}
          </ul>

        );
      })
    )
  }

  //renders the data and sets the date format as well
  dataRender(data, i) {
    console.log(data.date);
    let date = data.date.slice(0,9);
    return <li
      key={i}
      value={i}
    >
      <p
      key={i+"date"}
      >date: {date}</p>
      <p
      key={i+"score"}
      >score: {data.score}</p>
      <p
      key={i+"hands"}
      >hands played: {data.handsPlayed}</p>
      <p
      key={i+"notes"}
      >notes: {data.note}</p>
    </li>
  }
}

//mapping the user state to props for grabbing their history
const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  });
}

//export HistoryPage component
export default connect(mapStateToProps)(HistoryPage);