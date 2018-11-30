import React from 'react';

export const restart = ()=> {
  this.setState({
    showModal: false,
    hand: [{}, {}, {}, {}, {}],
    currentCard: null,
    graded: false
  })
}

export const resetButton = (<button onClick={() => this.restart()} aria-label="reset">Reset</button>);

