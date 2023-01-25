import './App.css';
import { useState, useRef } from 'react';
import { FaArrowDown, FaArrowUp, FaPlay, FaPause } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

function App() {
  const [breakL, setBreakL] = useState("5");
  const [session, setSession] = useState("25");
  const [minutes, setMinutes] = useState (session);
  const [seconds, setSeconds] = useState ("00");
  const [on, setOn] = useState("pauza");
  const [naziv, setNaziv] = useState("Session");
  const [color, setColor] = useState("white");

  const smanjiBreak = () => {
    if(breakL > 1) {
      setBreakL(breakL - 1);
    }}

  const smanjiSession = () => {
    if(session > 10) {
      setSession(session - 1); 
      setMinutes(minutes - 1);  
    } else if (session <= 10 && session > 1) {
      setSession(session - 1); 
      setMinutes("0" + (minutes - 1)); 
    }
  }

  const povecajBreak = () => {
    if(breakL < 60) {
      setBreakL( breakL + 1);
    }}

  const povecajSession = () => {
    if(session < 60 && session >= 9) {
      setSession( session + 1);
      setMinutes(Number(minutes) + 1);  
    } else if(session < 9 && session >= 1) {
      setSession(session + 1)
      setMinutes("0" + (Number(minutes) + 1));
    }
  }

  const reset = () => {
    zaustavi();
    setBreakL(5);
    setSession(25);
    setMinutes(25);
    setSeconds("0"+0);
    setOn("pauza");
    setColor("White");
    setNaziv("Session");
    zvuk.pause();
    zvuk.currentTime = 0;
  }

    const akcija = useRef(null);
    let minuti = Number(minutes) * (60 * 1000) ;
    let sekunde = Number(seconds);
    let minut = 60 * 1000;
    let ponovi = Number(breakL) * (60 * 1000);
    let noviSession = Number(session) * (60 * 1000);
    let zvuk = document.getElementById("beep"); 
    let sound = true;
  
  function timer() {
    if (minuti <= 600000 && sekunde === 0 && minuti > 0) {
      setMinutes("0" + (minuti -= minut) / (60 * 1000));
      sekunde = 60;
      setSeconds(sekunde -= 1);
    } else if (minuti >600000 && sekunde === 0) {
      setMinutes((minuti -= minut) / (60 * 1000));
      sekunde = 60;
      setSeconds(sekunde -= 1);
    } else if (sekunde <= 10 && sekunde > 0) {
      setSeconds("0" + (sekunde -= 1));
    }  else if (sekunde > 10) {
      setSeconds(sekunde -= 1);
    } else if (minuti === 0 && sekunde === 0 && sound === true) {
      zvuk.play();
      if(ponovi <= 600000) {
        setMinutes("0" + breakL);
      } else {
        setMinutes(breakL);
      }
      sound = false;
      setNaziv("Break");
    } else if (minuti === 0 && sekunde === 0 && ponovi <= 600000 && ponovi > 0) {
      setNaziv("Break");
      sound = false;
      setMinutes("0" + (ponovi -= minut) / (60 * 1000));
      sekunde = 60;
      setSeconds(sekunde -= 1);
    } else if (minuti === 0 && ponovi > 600000 && sekunde === 0) {
      setNaziv("Break");
      sound = false;
      setMinutes((ponovi -= minut) / (60 * 1000));
      sekunde = 60;
      setSeconds(sekunde -= 1);
    } else if (minuti === 0 && sekunde === 0 && ponovi === 0) {
      zvuk.play();
      if(noviSession <= 600000) {
        setMinutes("0" + session);
      } else {
        setMinutes(session);
      }
      minuti = Number(session) * (60 * 1000);
      ponovi = Number(breakL) * (60 * 1000);
      setNaziv("Session");
      sound = true;
    }    
   }

  function odbrojavanje() {
    akcija.current = setInterval(timer, 1000);
  }

  function zaustavi() {
    clearInterval(akcija.current);
  }

  const start = () => { 
    if(on === "pauza") {
      setOn("radi");
      odbrojavanje();
    } else if (on !== "pauza"){
      setOn("pauza");
      zaustavi();
    }
  }

  return (
    <div className="App">
      <div className="sadrzaj">
      <h1>25 + 5 Clock</h1>
      <div id="break-label">
        Break Length
        <div id="break-dugmad">
        <div id="break-decrement" onClick={smanjiBreak}>{<FaArrowDown/>}</div>
        <div id="break-length">{breakL}</div>
        <div id="break-increment" onClick={povecajBreak}>{<FaArrowUp/>}</div>
        </div>
      </div>
      <div id="session-label">
        Session Length
        <div id="session-dugmad">
        <div id="session-decrement" onClick={smanjiSession}>{<FaArrowDown/>}</div>
        <div id="session-length">{session}</div>
        <div id="session-increment" onClick={povecajSession}>{<FaArrowUp/>}</div>
        </div>
      </div>
      <div id="time">
        <div id="timer-wrap" style={{color: color}}>
        <p id="timer-label">{naziv}</p>
        <p id="time-left"> {minutes}:{seconds}</p> 
        <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" ></audio>
        </div>
        <div id="inline">
      <div id="start_stop" onClick={start}><FaPlay/><FaPause/></div>
      <div id="reset" onClick={reset}><HiRefresh/></div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default App;


