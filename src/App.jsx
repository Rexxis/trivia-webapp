import React from 'react'
import { nanoid } from 'nanoid'
import Splash from './components/Splash'
import Trivia from './components/Trivia'
import "./styles.css"

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([])


  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple&encode=base64")
      .then(res => res.json())
      .then(data => setTriviaData(data.results))
  }, [])


  function startQuiz() {
    setIsPlaying(prevState => !prevState)
  }

  let triviaElements = triviaData.map(item => {
    return (<Trivia 
      key={nanoid()}
      question={atob(item.question)} 
      incorrect={item.incorrect_answers.map(incorrect => atob(incorrect))}
      correct={atob(item.correct_answer)} />)
  })

  return (
    <main>
      {isPlaying ? 
        <div className="main-container">
          {triviaElements}
         <button className="bottom-btn btn">Check answers</button>
        </div>
        :
        <Splash startquiz={startQuiz}/>
    }
    </main>
  )
}