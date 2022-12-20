import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';


function App() {

  const [input, setInput] = useState("");
  const [GPTResponse, setGPTResponse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${input}`)
    // query({prompt: "what is the meaning of life?"}).then((response) => {
    //   console.log(response) 
    //   })

    const response = fetch('http://localhost:3001/', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  body: JSON.stringify({prompt: input})
}).then((response) => response.json())
  .then((data) => {console.log(data.result); setGPTResponse(data.result)})

  }

  return (
    <div className="App" style={{backgroundColor: "#121212", overflow: "hidden"}}>
      <form className="inputBox" onSubmit={handleSubmit}>
        <input type="text" className="input" placeholder="Ask me anything." onChange={(event) => setInput(event.target.value)}></input>
        <button type="submit" className="submit">Go</button>
      </form>
      <br />
      {GPTResponse ? 
        <div style={{color: "white"}} className="response">{GPTResponse}</div>
         : ""}
    </div>
  );
}

export default App;
