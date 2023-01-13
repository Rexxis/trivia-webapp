import React from 'react'
import { nanoid } from 'nanoid'
import Splash from './components/Splash'
import Trivia from './components/Trivia'
import "./styles.css"

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaData(data.results))
  }, [])
  
  let displayTrivia = triviaData.map(item => {
    return (<Trivia 
      key={nanoid()}
      question={item.question} 
      incorrect={item.incorrect_answers} 
      correct={item.correct_answer} />)
  })

  return (
    {isPlaying 
      ? 
      
      <div className="main-container">
        {displayTrivia}
        <button className="bottom-btn">Check answers</button>
      </div>

      :
      <Splash />
    }
  )
}