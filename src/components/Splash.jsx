import React from 'react'

export default function Splash(props) {
  return (
    <div className="main-container">
        <h1 className="intro-title">Quizzical</h1>
        <p className="intro-paragraph">Some description if needed</p>
        <button className="start-button btn" onClick={props.startquiz}>Start quiz</button>
    </div>
  )
}
