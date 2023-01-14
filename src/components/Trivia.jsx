import React from 'react'
import {nanoid} from 'nanoid'
import Choices from './Choices'

export default function Trivia(props) {
    const allOptions = [props.correct, ...props.incorrect]
    
    const choices = allOptions.map(item => {
        return <Choices key={nanoid()} value={item} />
    })

  return (
    <div className="trivia-set">
        <h3>{props.question}</h3>
        <div className="answers">
            {choices}
        </div>
    <hr />
  </div>
  )
}
