import React from "react";
import { connect } from 'react-redux';


class DevState extends React.Component {
  render() {
    return (
      <div>
        <p>authToken: {this.props.authToken}</p> 
        <p>currentUser: {this.props.currentUser}</p>
        <p>loading: {this.props.loading}</p>
        <p>error: {this.props.error}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    authToken: state.auth.authToken,
    // currentUser: state.auth,
    loading: state.auth.loading,
    error: state.auth.error
  })
}

export default connect(mapStateToProps)(DevState);
