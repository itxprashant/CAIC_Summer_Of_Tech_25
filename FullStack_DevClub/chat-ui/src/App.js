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
    // get the username
    event.preventDefault();

    const form = event.target;
    const username = form.username.value; // Corrected property access
    const password = form.password.value; // Corrected property access

    // get post request status
    fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS for all origins
      },
      body: JSON.stringify({ email: username, password: password }),
    })
      .then(response => {
        if (response.ok) {
          alert('Login successful');
        } else if (response.status === 404) {
          alert('User not found');
        } else if (response.status === 401) {
          alert('Incorrect password');
        } else {
          alert('An error occurred');
        }
      })
      .catch(error => {
        console.error('Error during fetch:', error);
        alert('Failed to connect to the server. Please try again later.');
      });
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
        <form onSubmit={submitHandler}>
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
          }}>
            Submit
          </button>
        </form>
      </div>
      </header>
    </div>
  );
}

export default App;