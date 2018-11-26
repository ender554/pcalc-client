import React from "react";
// import { Link } from "react-router-dom";
import './splash.css';

export function Splash(){
  return(
    <div className="splash-page">
      <div className="focus">
        <h1>Welcome to PCAP!</h1>
        <h2>Where Video Poker is your Ticket to Freebies</h2>
        <p className="about">Contrary to popular belief, Not all casino games are negative equity!
        In fact some forms of video poker have positive equity! If played completely correctly
        video poker games return anywhere from 99.76% to 100.43% if played with perfect strategy!

        This app is to give you that perfect strategy!


        WARNING:::::::: LOGIC NOT CURRENTLY CORRECTLY FUNCTIONAL DO NOT USE FOR TRUE ADVICE 
        </p>
      </div>
    </div>
  )
}