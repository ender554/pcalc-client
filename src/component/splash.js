import React from "react";
import { Link } from "react-router-dom";
import './splash.css';

export function Splash(){
  return(<main className="splash-page">
  <div className="focus">
    <h1>PCALC</h1>
    <p className="about">Contrary to popular belief, Not all casino games are negative equity!
    Some forms of video poker have positive equity! If played correctly!
    This app is to give you that perfect strategy!
    </p>
    <p>Instructions:</p>
    <p><Link to='/game'><button>New Game</button></Link> allows you to enter in cards and recieve the cards to hold</p>
    <p><Link to='/training'><button>Training</button></Link> play fast paced guesswork game to see how good you are</p>
  </div>
</main>
  )
}