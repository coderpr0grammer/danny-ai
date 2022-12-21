import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import loader from './loader.svg';
// import { uuid } from 'uuidv4';


function App() {
  const [input, setInput] = useState("");
  const [GPTResponse, setGPTResponse] = useState("");
  const [responsesArray, setResponsesArray] = useState([]);
  const [loading, setLoading] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState (0);


  useEffect(() => {
    setButtonDisabled(0)
    document.title = "Dani AI - Ask me anything.";
    console.log(JSON.parse(localStorage.getItem("responsesArray")))
    localStorage.getItem ? setResponsesArray(JSON.parse(localStorage.getItem("responsesArray"))) : setResponsesArray([])
    // setResponsesArray(JSON.parse(localStorage.getItem("responsesArray")))
    // console.log("responsesarray", responsesArray)
  }, [])

  useEffect((event) => {
    console.log(event)
  }, [input])

  const disableButton = (e) => {
    if (buttonDisabled) {
      return;
    }
    
  }

  const handleSubmit = (event) => {
    setButtonDisabled(1)
    setLoading(1);
    console.log(loading)
    event.preventDefault();
    let responseObject = {question: input, response: ""}
    
    // alert(`The name you entered was: ${input}`)
    // query({prompt: "what is the meaning of life?"}).then((response) => {
    //   console.log(response) 
    //   })

    const response = fetch('https://dani-ai-server.vercel.app/api', {
      method: 'POST',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  body: JSON.stringify({prompt: input})
}).then((response) => response.json())
  .then((data) => {
    setButtonDisabled(0)
    responseObject.response = data.result;
    // console.log(responseObject)
    // console.log(data.result);
    setGPTResponse(responseObject)
    let otherResponseArray = responsesArray || [];
    console.log(otherResponseArray.unshift(responseObject))
    setResponsesArray(otherResponseArray)
    localStorage.setItem("responsesArray", JSON.stringify(otherResponseArray))
    console.log(responsesArray)
    setLoading(0);
  })

  }

  return (
    <div className="App">
      <h1 style={{fontFamily: 'monospace', color: "orange", fontSize: "40px"}}>Dani AI</h1>
      <form className="inputBox" onSubmit={handleSubmit}>
        <textarea type="text" className="input" placeholder="Ask me anything." required onChange={(event) => setInput(event.target.value)}></textarea>
        <button type="submit" className="submit" disabled={buttonDisabled}>{loading ? <?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(241, 242, 243); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="translate(50,50)">
  <g transform="scale(0.7)">
  <circle cx="0" cy="0" r="50" fill="#f97924"></circle>
  <circle cx="0" cy="-28" r="15" fill="#2c2c2c">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 0 0;360 0 0"></animateTransform>
  </circle>
  </g>
</g> : "Go"}</button>
      </form>
      <br />
      {responsesArray ? 
        <div style={{color: "white"}} className="allResponses">{responsesArray.map((theResponse, i) => {return (
          <div className="responseBox">

            <div className="question">{theResponse.question}</div>
            <div className="response">{theResponse.response}</div>
          </div>

          )})}</div>
         : ""}
    </div>
  );
}

export default App;
