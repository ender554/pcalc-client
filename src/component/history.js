import React from 'react'
import { connect } from 'react-redux';
import './training.css';

class HistoryPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { props };
  }

  clicked(e) {
    this.showHistory(this.props.auth.currentUser.sessions);

  }

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
  dataRender(data, i) {
    return <li
      key={i}
      value={i}
    >
      <p
      key={i+"date"}
      >date: {data.date}</p>
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

  render() {
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
      <div className="history">
        {viewHistory}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return ({
    auth: state.auth
  });
}
export default connect(mapStateToProps)(HistoryPage);