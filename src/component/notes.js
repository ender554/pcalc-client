import React from "react";
import './notes.css';





export class Notes extends React.Component {

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <div className="notePad">
        <span className="noteField">
          <input
            type="text"
          >
          </input>
        </span>
      </div>
    )
  }
}