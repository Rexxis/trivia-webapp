import React from 'react'
import { nanoid } from 'nanoid'

export default function Splash(props) {
  const difficulties = props.difficulties

  const difficultyElement = difficulties.map(item => {
    return (
      <button
        key={nanoid()}
        id={item.selected !== "none" && item.selected !== item.level ? "not-selected" : "none"}
        className={item.selected === item.level ? "btn selected" : "btn answer-item"}
        onClick={() => props.handleDifficulty(item.level)}>{item.level}</button>
    )
  })

  return (
    <div className="main-container">
        <h1 className="intro-title">Quizzical</h1>
        <p className="intro-paragraph">A trivia quiz to tease your brain !</p>
        <h3 className='difficulty-title'>Select your difficulty level</h3>
        <div className='answers'>
          {difficultyElement}
        </div>
        <button className="start-button btn" onClick={props.startquiz}>Start quiz</button>
    </div>
  )
}
