import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext();

function UserContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("listening..");
  const [response, setResponse] = useState("");

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);
    let newText = text.split("**") && text.split("*")&&text.replace("google", "Himangi Singh") && text.replace("Google", "Himangi Singh");
    setPrompt(newText);
    speak(newText);
    setResponse(true);
    setTimeout(() => {
      setSpeaking(false);
    }, 5000);
  }

  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition();
  
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    setPrompt(transcript);
    takeCommand(transcript.toLowerCase());
  }

  function takeCommand(command){
      if(command.includes("open") && command.includes
    ("youtube")){
        window.open("https://www.youtube.com/", "_blank");
        speak("opening YouTube");
        setResponse(true);
        setPrompt("opening YouTube..");
        setTimeout(() => {
            setSpeaking(false);
           }, 5000);
    } else if(command.includes("open") && command.includes
    ("google")){
        window.open("https://www.google.com/", "_blank");
        speak("opening google");
        setResponse(true);
        setPrompt("opening google..");
        setTimeout(() => {
            setSpeaking(false)
           }, 5000);
    } else if(command.includes("open") && command.includes
    ("chatgpt")){
        window.open("https://www.chatgpt.com/", "_blank");
        speak("opening chatgpt");
        setResponse(true)
        setPrompt("opening chatgpt..");
        setTimeout(() => {
            setSpeaking(false);
           }, 5000);
    } else if(command.includes("time")){
        let time=new Date().toLocaleString(undefined,
        {hour:"numeric",minute:"numeric"})
        speak(time)
        setResponse(true)  
        setPrompt(time);
        setTimeout(() => {
            setSpeaking(false);
           }, 5000);
     }
     else if(command.includes("date")){
        let date=new Date().toLocaleString(undefined,
        {day:"numeric",month:"short"})
        speak(date) 
        setResponse(true) 
        setPrompt(date);
        setTimeout(() => {
            setSpeaking(false);
           }, 5000);
        }
    else{
        aiResponse(command);
    }
  }
    

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse
  }

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  )
}

export default UserContext
