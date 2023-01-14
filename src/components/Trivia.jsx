import React from 'react'
import {nanoid} from 'nanoid'

export default function Trivia(props) {
  // Rename answers to local variable
  let answers = props.data.answers

  // Map answers element into buttons
  const answersElement = answers.map(answerItem => {
    let classOpt = "";
    if (props.data.checked) {
      if (props.data.correct === answerItem) {
        classOpt = 'correct'
      }
      else if (props.data.selected === answerItem) {
        classOpt = 'incorrect'
      }
      else {
        classOpt = 'not-selected'
      }
    }
    return (
      <button 
        key={nanoid()} 
        id={classOpt}
        className={answerItem === props.data.selected ? 'btn selected' : 'btn answer-item'}
        onClick={() => props.handleClickAnswer(props.data.id, answerItem)}>{atob(answerItem)}</button> 
    )
  })

  return (
    <div className="trivia-set">
        <h3>{atob(props.question)}</h3>
        <div className="answers">
          {answersElement}
        </div>
    <hr />
  </div>
  )
}
