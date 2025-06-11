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

function submitHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  // Call the click handler
  onClickHandler();
}

useEffect(() => {
  // Log the current click count to the console
  console.log(`Button clicked ${clicks} times`);
}
, [clicks]);


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          background: 'linear-gradient(to right, red, blue)', 
          padding: '20px', 
          borderRadius: '10px' 
        }}>
        <form>
          <label>
            Username: 
            <span style={{ marginRight: '10px' }} />
            <input type="text" name="username" />
          </label>
          <br />
          <label>
            Password:
            <span style={{ marginRight: '10px' }} />
            <input type="password" name="password" />
          </label>
          <br/>
          <br/>
          <button style={{
            backgroundColor: 'green',
            color: 'white',
            justifyContent: 'center',
            alignContent: 'center',
            fontSize: '20px', // Increased font size
            padding: '10px 20px', // Increased padding for larger button
          }} onClick={submitHandler}>
            Submit
          </button>
        </form>
      </div>
      </header>
    </div>
  );
}

export default App;
