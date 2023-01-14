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

  const categories = props.categories

  const categoryElement = categories.map(item => {
    return (
      <button
        key={nanoid()}
        id={item.selected !== "none" && item.selected !== item.name ? "not-selected" : "none"}
        className={item.selected === item.name ? "btn selected" : "btn answer-item"}
        onClick={() => props.handleCategory(item.name, item.value)}>{item.name}</button>
    )
  })

  return (
    <div className="main-container">
        <h1 className="intro-title">Quizzical</h1>
        <p className="intro-paragraph">A trivia quiz to tease your brain !<br /></p>
        <h3 className='difficulty-title'>Select your difficulty level</h3>
        <div className='answers'>
          {difficultyElement}
        </div>
        <h3 className='difficulty-title'>Select category</h3>
        <div className='answers'>
          {categoryElement}
        </div>
        <p className='made-by'>(Made by David Harendza - January 2023)</p>
        <button className="start-button btn" onClick={props.startquiz}>Start quiz</button>
    </div>
  )
}
