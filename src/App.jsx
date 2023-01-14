import React from 'react'
import { nanoid } from 'nanoid'
import Splash from './components/Splash'
import Trivia from './components/Trivia'
import Confetti from "react-confetti"
import "./styles.css"

export default function App() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [newGame, setNewGame] = React.useState(false)
  const [correctAnswer, setCorrectAnswer] = React.useState(false)

  const [difficulty, setDifficulty] = React.useState("easy")
  const [difficulties, setDifficulties] = React.useState([{level: "Easy", selected: "none"}, {level: "Medium", selected: "none"}, {level: "Hard", selected: "none"}])

  const [categories, setCategories] = React.useState([{name: "All", value: "", selected: "none"}, {name: "General Knowledge", value: "&category=9", selected: "none"}, {name: "Film", value: "&category=11", selected: "none"}, {name: "Vehicles", value: "&category=28", selected: "none"}])
  const [category, setCategory] = React.useState("")
  
  const [triviaData, setTriviaData] = React.useState([])

  // Function to shuffle array
  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5)


  // Get data from API and parse into own object
  React.useEffect(() => {
    console.log(`link:${difficulty}, ${category}`)
    fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}${category}&type=multiple&encode=base64`)
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

  }, [isPlaying, newGame])


  // Function to handle difficulty buttons
  function handleDifficulty(level) {
    setDifficulties(diff => diff.map(item => {
      return {...item, selected: level}
    }))
    const newLevel = level.toLowerCase()
    setDifficulty(newLevel)
  }

  // Function to handle category buttons
  function handleCategory(cat, val) {
    setCategories(item => item.map(obj => {
      return {...obj, selected: cat}
    }))
    
    setCategory(val)
  }

  // Handle start quiz button from splash screen
  function startQuiz() {
    if (difficulties.every(item => item.selected === "none")) {
      return
    }

    if (categories.every(item => item.selected === "none")) {
      return
    }

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
    const allSelected = triviaData.every(data => data.selected !== "none")

    // If not all trivia has been answered
    if (!allSelected) {
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
    setCorrectAnswer(0)
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
          {correctAnswer >= 3 && <Confetti />}
          {triviaElements}
          <div className='bottom-container'>
            {isChecked && <h2>You scored {correctAnswer}/5 correct answers</h2>}<button className="bottom-btn btn" onClick={isChecked ? playAgain : handleCheck}>{isChecked ? "Play Again" : "Check answers"}</button>
          </div>
        </div>
        :
        <Splash startquiz={startQuiz} difficulties={difficulties} categories={categories} handleDifficulty={handleDifficulty} handleCategory={handleCategory} />
    }
    </main>
  )
}