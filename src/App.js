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
    setInput("")
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

  const handleInput = (inputBox) => {
    setInput(inputBox.value)
    inputBox.style.height = 'auto';
    inputBox.style.height = (inputBox.scrollHeight - 20) + "px"
  }

  return (
    <div className="App">
      <h1 style={{fontFamily: 'monospace', color: "orange", fontSize: "40px"}}>Dani AI</h1>
      <form className="inputBox" onSubmit={handleSubmit}>
        <textarea type="text" className="input" placeholder="Ask me anything." required onChange={(event) => handleInput(event.target)} style={{maxHeight: "200px", overflowY: "auto"}} rows="1">{input}</textarea>
        <button type="submit" className="submit" disabled={buttonDisabled}>{loading ? <img src={loader} width="50" height="50"/> : "Go"}</button>
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
