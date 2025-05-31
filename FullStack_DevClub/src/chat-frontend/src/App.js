import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

// create click state
const [clicks, setClicks] = useState(0);

function onClickHandler() {
  // increment click count
  setClicks(clicks + 1);
  if (clicks + 1 === 10) {
    setClicks(0);
  }
}

useEffect(() => {
  // Log the current click count to the console
  console.log(`Button clicked ${clicks} times`);
}
, [clicks]);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onClickHandler}>
          Click me: {clicks}
        </button>
      </header>
    </div>
  );
}

export default App;
