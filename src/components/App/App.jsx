import { useEffect, useState } from 'react'
import css from './App.module.css'
import Description from '../Description/Description'
import Feedback from '../Feedback/Feedback'
import Options from '../Options/Options'


function App() {
  const [state, setState] = useState(() => {
    const savedState = localStorage.getItem('feedback')
    if (savedState) {
      return JSON.parse(savedState)
    } 
      return {
        good: 0,
        neutral: 0,
        bad: 0
      }    
  })

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(state))
  }, [state])

  const updateFeedback = (feedbackType) => {
    setState(prevState => {
      return {
       ...prevState,
        [feedbackType]: prevState[feedbackType] + 1
      }
    })
  }
  
  const handleReset = () => {
    setState({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }
  const totalFeedback = state.good + state.neutral + state.bad
  
  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} handleReset={handleReset} totalFeedback={totalFeedback} />
      {totalFeedback ? <Feedback state={state} totalFeedback={totalFeedback} /> : null}
      {!totalFeedback? <h1 className={css.noFeedback}>No feedback given</h1> : null}
    </>
    
  )
 
}

export default App
