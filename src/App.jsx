import React from 'react'
import { nanoid } from 'nanoid'
import Splash from './components/Splash'
import Trivia from './components/Trivia'
import "./styles.css"

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [newGame, setNewGame] = React.useState(false)
  const [correctAnswer, setCorrectAnswer] = React.useState(false)

  const [difficulty, setDifficulty] = React.useState("easy")
  const [difficulties, setDifficulties] = React.useState([{level: "Easy", selected: "none"}, {level: "Medium", selected: "none"}, {level: "Hard", selected: "none"}])
  
  const [triviaData, setTriviaData] = React.useState([])

  // Function to handle difficulty button

  function handleDifficulty(level) {
    setDifficulties(diff => diff.map(item => {
      return {...item, selected: level}
    }))
    const newLevel = level.toLowerCase()
    setDifficulty(newLevel)
  }

  // Function to shuffle array
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)


  // Get data from API and parse into own object
  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple&encode=base64`)
      .then(res => res.json())
      .then(data => setTriviaData(data.results.map(item => {
        return ({
          id: nanoid(),
          answers: shuffle([item.correct_answer, ...item.incorrect_answers]),
          question: item.question,
          correct: item.correct_answer,
          selected: "none",
          checked: false
        })
      })))

  }, [newGame])


  // Handle start quiz button from splash screen
  function startQuiz() {
    setIsPlaying(prevState => !prevState)
  }


  // Handle if answer button clicked
  function handleClickAnswer(id, answer) {
    // Check if status already check 
    if (isChecked) {
      return
    }
    // Update the selected item
    setTriviaData(data => data.map(item => {
      return item.id === id ? {...item, selected: answer} : item
    }))
  }


  // Handle check answer button
  function handleCheck() {
    // Check if each trivia has been answered, if not -> button does not work
    let selected = true
    triviaData.forEach(data => {
      if (data.selected === "none") {
        selected = false
        return
      }
    })

    if (!selected) {
      return
    }

    // Set all checked property in triviaData to true
    setTriviaData(data => data.map(item => ({...item, checked: true})))

    // Set isChecked state to true
    setIsChecked(true)

    // Count correct answers
    let correct = 0
    triviaData.forEach(data => {
      if (data.correct === data.selected) {
        correct += 1
      }
    })

    // Update correct answer state
    setCorrectAnswer(correct)
  }


  function playAgain() {
    setIsChecked(false)
    setNewGame(prevState => !prevState)
  }


  // Map triviaElements
  let triviaElements = triviaData.map(item => {
    return (<Trivia 
      key={item.id}
      question={item.question}
      data={item} 
      handleClickAnswer={handleClickAnswer}
      />)
  })

  return (
    <main>
      {isPlaying ? 
        <div className="main-container">
          {triviaElements}
          <div className='bottom-container'>
            {isChecked && <h2>You scored {correctAnswer}/5 correct answers</h2>}<button className="bottom-btn btn" onClick={isChecked ? playAgain : handleCheck}>{isChecked ? "Play Again" : "Check answers"}</button>
          </div>
        </div>
        :
        <Splash startquiz={startQuiz} difficulties={difficulties} handleDifficulty={handleDifficulty}/>
    }
    </main>
  )
}