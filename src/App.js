import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
// import { uuid } from 'uuidv4';


function App() {
  const [input, setInput] = useState("");
  const [GPTResponse, setGPTResponse] = useState("");
  const [responsesArray, setResponsesArray] = useState([]);
  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("responsesArray")))
    setResponsesArray(JSON.parse(localStorage.getItem("responsesArray")))
    // setResponsesArray(JSON.parse(localStorage.getItem("responsesArray")))
    // console.log("responsesarray", responsesArray)
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    let responseObject = {question: input, response: ""}
    
    // alert(`The name you entered was: ${input}`)
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
  .then((data) => {
    responseObject.response = data.result;
    // console.log(responseObject)
    // console.log(data.result);
    setGPTResponse(responseObject)
    let otherResponseArray = responsesArray;
    otherResponseArray.push(responseObject)
    setResponsesArray(otherResponseArray)
    localStorage.setItem("responsesArray", JSON.stringify(otherResponseArray))
    console.log(responsesArray)
  })

  }

  return (
    <div className="App" style={{backgroundColor: "#121212"}}>
      <form className="inputBox" onSubmit={handleSubmit}>
        <input type="text" className="input" placeholder="Ask me anything." required onChange={(event) => setInput(event.target.value)}></input>
        <button type="submit" className="submit">Go</button>
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
